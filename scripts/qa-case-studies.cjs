// Local regression checks. See docs/case-study-qa.md for setup and coverage.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('fs');
const assert=require('assert');
const path=require('path');
const artifactDir=process.env.QA_ARTIFACT_DIR || path.join(require('os').tmpdir(),'case-study-qa');
fs.mkdirSync(artifactDir,{recursive:true});
const baseURL=process.env.QA_BASE_URL || 'http://localhost:3000';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.PLAYWRIGHT_BROWSER_PATH || undefined});
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 const page=await context.newPage(); const result={checks:[],failures:[],errors:[],requests:[]};
 page.on('pageerror',e=>result.errors.push(e.message));
 const check=async(name,fn)=>{try{await fn();result.checks.push(name)}catch(e){result.failures.push({name,error:e.message});console.log('FAIL',name,e.message)}};
 await page.goto(baseURL+'/teams');
 if(await page.locator('input[type=password]').count()){
  const a=fs.readFileSync(path.join(__dirname,'../src/app/_actions/case-access.ts'),'utf8');
  await page.locator('input[type=password]').fill(process.env.QA_CASE_PASSWORD || a.match(/const DEFAULT_PASSWORD = "([^"]+)"/)[1]);await page.locator('button[type=submit]').click();await page.getByRole('button',{name:'Present Mode',exact:true}).waitFor();
 }
 const enter=async()=>{await page.getByRole('button',{name:'Present Mode',exact:true}).click();await page.waitForTimeout(180)};
 const state=()=>page.locator('.presentation-announcement').innerText();
 for(const route of ['teams','fluent']){
  await page.goto(baseURL+'/'+route);await page.waitForTimeout(300);
  await check(route+' deferred offscreen video sources',async()=>{const a=await page.locator('video').evaluateAll(v=>({total:v.length,loaded:v.filter(e=>e.getAttribute('src')).length}));assert(a.loaded<a.total,JSON.stringify(a));result.requests.push({route,...a});});
  // Scroll every normal media frame; require image decoding and moving video time.
  const frames=page.locator('[data-case-media]');const count=await frames.count();
  for(let i=0;i<count;i++)await check(route+' normal media '+i,async()=>{
   const f=frames.nth(i);await f.scrollIntoViewIfNeeded();
   if(await f.locator('img').count()) await f.locator('img').evaluate(async img=>{await img.decode();if(!img.naturalWidth)throw Error('No decoded image')});
   else {await page.waitForFunction(e=>e.readyState>=2,f.locator('video').elementHandle?await f.locator('video').elementHandle():null,{timeout:20000});const v=f.locator('video');const t=await v.evaluate(e=>e.currentTime);await page.waitForTimeout(250);assert(await v.evaluate(e=>e.currentTime)>t,'Video time did not advance');}
  });
  await check(route+' scroll and focus restoration',async()=>{
   await page.evaluate(()=>window.scrollTo(0,600));await page.waitForTimeout(100);
   // Trigger via programmatic focus without scrolling, to preserve the saved position.
   await page.getByRole('button',{name:'Present Mode',exact:true}).evaluate(e=>{e.focus({preventScroll:true});e.click()});await page.waitForTimeout(200);
   await page.keyboard.press('Escape');await page.waitForTimeout(100);
   assert(Math.abs(await page.evaluate(()=>scrollY)-600)<2);
   assert(await page.getByRole('button',{name:'Present Mode',exact:true}).evaluate(e=>e===document.activeElement));
  });
  await enter();
  const n=Number((await state()).match(/of (\d+)/)[1]);
  for(let i=0;i<n;i++)await check(route+' presentation media and inert '+i,async()=>{
   const active=page.locator('[data-presentation-slide=active]');
   for(const img of await active.locator('img:visible').all())await img.evaluate(e=>e.decode());
   for(const v of await active.locator('video:visible').all()){
    await page.waitForFunction(e=>e.readyState>=2,await v.elementHandle(),{timeout:20000});let t=await v.evaluate(e=>e.currentTime);await page.waitForTimeout(180);assert(await v.evaluate(e=>e.currentTime)>t,'active video stopped');
   }
   assert(await page.locator('[data-presentation-slide=hidden]').evaluateAll(ss=>ss.every(e=>e.inert)));
   assert.equal(await page.locator('[data-presentation-slide=hidden] video').evaluateAll(v=>v.filter(e=>!e.paused).length),0);
   if(i<n-1)await page.keyboard.press('ArrowRight');
  });
  await check(route+' boundaries and final center',async()=>{
   assert(await page.getByRole('button',{name:'Next slide',exact:true}).isDisabled());const s=await state();await page.keyboard.press('ArrowRight');assert.equal(await state(),s);
   const b=await page.getByRole('heading',{name:'Any questions?'}).boundingBox();assert(Math.abs(b.y+b.height/2-450)<2);assert(Math.abs(b.x+b.width/2-720)<2);
   await page.keyboard.press('Home');assert(await page.getByRole('button',{name:'Previous slide',exact:true}).isDisabled());await page.keyboard.press('ArrowLeft');assert((await state()).startsWith('Slide 1 of'));
  });
  await check(route+' restart resets media',async()=>{
   await page.waitForTimeout(250);await page.keyboard.press('End');await page.keyboard.press('r');assert((await state()).startsWith('Slide 1 of'));assert(await page.locator('.fluent-case-hero video').evaluate(v=>v.currentTime)<0.5);
   await page.keyboard.press('End');await page.getByRole('button',{name:'Restart (R)',exact:true}).click();assert((await state()).startsWith('Slide 1 of'));
  });
  await check(route+' side zones hover focus and click',async()=>{
   await page.mouse.move(720,450);await page.waitForTimeout(150);assert.equal(await page.locator('.presentation-edge--next .presentation-edge-icon').evaluate(e=>getComputedStyle(e).opacity),'0');
   await page.mouse.move(1420,450);await page.waitForTimeout(180);assert.equal(await page.locator('.presentation-edge--next .presentation-edge-icon').evaluate(e=>getComputedStyle(e).opacity),'1');await page.mouse.click(1420,450);assert((await state()).startsWith('Slide 2 of'));
   await page.mouse.click(20,300);assert((await state()).startsWith('Slide 1 of'));
   await page.getByRole('button',{name:'Next slide',exact:true}).focus();await page.keyboard.press('Enter');assert((await state()).startsWith('Slide 2 of'));
  });
  await check(route+' role center width overline, outcome link and center',async()=>{
   const a=await page.locator('.case-role-slide').boundingBox();assert(Math.abs(a.y+a.height/2-450)<2);
   assert.equal(await page.locator('.presentation-role-overline').evaluate(e=>getComputedStyle(e).fontSize),'12px');
   await page.keyboard.press('End');await page.keyboard.press('ArrowLeft');assert(!await page.locator('.case-outcome .case-next').isVisible());const b=await page.locator('.case-outcome').boundingBox();assert(Math.abs(b.y+b.height/2-450)<2);
  });
  await check(route+' Escape from editable and video focus',async()=>{
   await page.locator('[data-presentation-slide=active]').evaluate(e=>{let i=document.createElement('input');i.dataset.qa='true';e.append(i);i.focus()});await page.keyboard.press('Escape');assert.equal(await page.locator('main[data-presentation]').count(),0);await page.locator('[data-qa]').evaluate(e=>e.remove());
   await enter();await page.locator('.fluent-case-hero video').evaluate(v=>{v.tabIndex=0;v.focus()});await page.keyboard.press('Escape');assert.equal(await page.locator('main[data-presentation]').count(),0);await page.locator('.fluent-case-hero video').evaluate(v=>v.removeAttribute('tabindex'));
   assert(await page.locator('.case-outcome .case-next').isVisible());
  });
  await check(route+' continuous resize and repeated toggles',async()=>{
   for(let cycle=0;cycle<4;cycle++){
    await enter();await page.keyboard.press('ArrowRight');await page.keyboard.press('ArrowRight');
    for(let width=1440;width>=360;width-=90){await page.setViewportSize({width,height:Math.round(400+width/3)});await page.waitForTimeout(30);assert.equal(await page.locator('[data-presentation-slide=active]').count(),1)}
    await page.keyboard.press('End');await page.keyboard.press('Home');await page.keyboard.press('Escape');
    assert.equal(await page.locator('[data-presentation-slide],[data-presentation-part],[data-presentation-measure]').count(),0);assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
    await page.setViewportSize({width:1440,height:900});
   }
  });
 }

 fs.writeFileSync(path.join(artifactDir,'functional.json'),JSON.stringify(result,null,2));console.log(JSON.stringify({passed:result.checks.length,failures:result.failures,errors:result.errors,initialVideos:result.requests}));await browser.close();
 if(result.failures.length || result.errors.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
