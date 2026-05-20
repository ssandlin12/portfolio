// Shared WebGL ray-marched blob shader used by /landing and /project.
// Each consumer can spin up multiple renderers with their own per-blob
// `energy` (fold-field amplitude) and `grain` (surface noise) values
// and call `renderBlob` once per frame.

export const VS = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

export const FS = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2 u_res;
uniform float u_fuzz;
uniform float u_grain;
uniform float u_rim;
uniform float u_rotY;
uniform float u_morph;       // 0 = blob, 1 = canvas frame
uniform float u_energy;      // blob fold-field multiplier (spikes mid-morph)
uniform float u_smooth;      // extra smin radius added to metaball/valley fusion
uniform vec2  u_aspect;      // canvas aspect (x = width / height, y = 1)
uniform int   u_colorMode;   // 0 = black, 1 = blue, 2 = dark moody

// === Noise helpers ================================================
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz; x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float snoise3(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
       i.z + vec4(0.0, i1.z, i2.z, 1.0))
     + i.y + vec4(0.0, i1.y, i2.y, 1.0))
     + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0 / 7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1),
                                  dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1),
                          dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
                                 dot(p2, x2), dot(p3, x3)));
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float sdRoundedBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + vec3(r);
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

float fbm3(vec3 p) {
  float v = 0.65 * snoise3(p);
  v += 0.30 * snoise3(p * 2.03 + vec3(11.7, -7.3, 5.5));
  return v;
}

float grain3(vec3 p) {
  float a = snoise3(p * 75.0 + vec3(11.0, 7.0, 3.0));
  float b = snoise3(p * 38.0 + vec3(13.0, 19.0, 5.0));
  return a * 0.60 + b * 0.40;
}

vec3 invRotY(vec3 wp) {
  float c = cos(u_rotY);
  float s = sin(u_rotY);
  return vec3(wp.x * c + wp.z * s, wp.y, -wp.x * s + wp.z * c);
}

float sceneSDF(vec3 wp, vec3 c1, vec3 c2, vec3 c3, vec3 n1, vec3 n2) {
  vec3 p = invRotY(wp);

  vec3 pBlob = p;
  float twist = sin(u_time * 0.20) * 2.5;
  float ta = pBlob.y * twist;
  float tc = cos(ta);
  float ts = sin(ta);
  pBlob.xz = mat2(tc, -ts, ts, tc) * pBlob.xz;

  float spreadT = pow(u_morph, 1.4);
  float spreadX = mix(1.0, 4.6 * u_aspect.x, spreadT);
  float spreadY = mix(1.0, 3.6, spreadT);
  vec3  cs  = vec3(spreadX, spreadY, 1.0);
  vec3  c1m = c1 * cs;
  vec3  c2m = c2 * cs;
  vec3  c3m = c3 * cs;
  vec3  n1m = n1 * cs;
  vec3  n2m = n2 * cs;

  float r = 0.28;
  float k  = mix(0.10, 0.55, u_morph) + u_smooth;
  float d1 = length(pBlob - c1m) - r * 0.92;
  float d2 = length(pBlob - c2m) - r * 1.04;
  float d3 = length(pBlob - c3m) - r * 0.92;
  float dBlob = smin(d1, smin(d2, d3, k), k);

  float ks  = mix(0.07, 0.28, u_morph) + u_smooth * 0.6;
  float dn1 = length(pBlob - n1m) - 0.13;
  float dn2 = length(pBlob - n2m) - 0.13;
  dBlob = -smin(-dBlob, dn1, ks);
  dBlob = -smin(-dBlob, dn2, ks);

  vec3 hpA = p * 1.4 + vec3(-u_time * 0.35, -u_time * 0.45, u_time * 0.20);
  float foldA = fbm3(hpA);
  vec3 hpB = p * 3.2 + vec3(u_time * 0.25, u_time * 0.30, -u_time * 0.18);
  float foldB = snoise3(hpB);

  dBlob += (foldA * 0.16 + foldB * 0.038) * u_energy;

  vec3  boxHalf = vec3(u_aspect.x * 0.94, 0.94, 0.10);
  float dBox    = sdRoundedBox(p, boxHalf, 0.035);
  dBox += foldA * 0.010 + foldB * 0.003;

  float dA = dBlob + pow(u_morph,         1.6) * 0.55;
  float dB = dBox  + pow(1.0 - u_morph,   1.4) * 0.13;
  return smin(dA, dB, 0.18);
}

vec3 calcNormal(vec3 p, vec3 c1, vec3 c2, vec3 c3, vec3 n1, vec3 n2) {
  float h = 0.0015;
  vec2 e = vec2(h, 0.0);
  return normalize(vec3(
    sceneSDF(p + e.xyy, c1, c2, c3, n1, n2) - sceneSDF(p - e.xyy, c1, c2, c3, n1, n2),
    sceneSDF(p + e.yxy, c1, c2, c3, n1, n2) - sceneSDF(p - e.yxy, c1, c2, c3, n1, n2),
    sceneSDF(p + e.yyx, c1, c2, c3, n1, n2) - sceneSDF(p - e.yyx, c1, c2, c3, n1, n2)
  ));
}

void main() {
  vec2 uv = v_uv * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  float t = u_time;

  vec3 c1 = vec3( 0.06, -0.14,  0.06) + vec3(
    snoise(vec2(t,        1.7)),
    snoise(vec2(2.3,      t)),
    snoise(vec2(t * 0.7,  4.5))
  ) * 0.020;
  vec3 c2 = vec3( 0.16,  0.00,  0.0) + vec3(
    snoise(vec2(t + 5.0,  3.1)),
    snoise(vec2(7.7,      t + 1.0)),
    snoise(vec2(t + 5.5,  6.0))
  ) * 0.020;
  vec3 c3 = vec3( 0.06,  0.14, -0.06) + vec3(
    snoise(vec2(t + 11.0, 4.5)),
    snoise(vec2(13.2,     t + 3.0)),
    snoise(vec2(t + 11.5, 8.0))
  ) * 0.020;

  vec3 n1 = vec3(-0.08, -0.09,  0.0) + vec3(
    snoise(vec2(t + 17.0, 6.0)),
    snoise(vec2(19.4,     t + 5.0)),
    snoise(vec2(t + 17.5, 10.0))
  ) * 0.015;
  vec3 n2 = vec3(-0.08,  0.09,  0.0) + vec3(
    snoise(vec2(t + 23.0, 8.0)),
    snoise(vec2(25.0,     t + 7.0)),
    snoise(vec2(t + 23.5, 12.0))
  ) * 0.015;

  vec3 ro = vec3(uv * 0.99, 2.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);

  float td = 0.0;
  bool hit = false;
  float minDist = 1.0;
  for (int i = 0; i < 100; i++) {
    vec3 rp = ro + rd * td;
    float d = sceneSDF(rp, c1, c2, c3, n1, n2);
    minDist = min(minDist, d);
    if (d < 0.0008) { hit = true; break; }
    td += max(d * 0.32, 0.004);
    if (td > 4.0) break;
  }

  vec3 finalCol = vec3(0.030);
  float finalAlpha = 0.0;

  if (hit) {
    vec3 wp = ro + rd * td;
    vec3 N  = calcNormal(wp, c1, c2, c3, n1, n2);
    vec3 V  = -rd;
    vec3 L  = normalize(vec3(-0.42, 0.52, 0.74));
    vec3 H  = normalize(L + V);

    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);

    float specExp = mix(22.0, 38.0, clamp(u_morph, 0.0, 1.0));
    float fresnel = pow(1.0 - NdotV, u_rim);
    float fuzz    = fresnel * (0.25 + 0.75 * NdotL) * u_fuzz;
    float g = grain3(invRotY(wp));

    vec3 lit;
    if (u_colorMode == 0) {
      lit  = vec3(0.020);
      lit += vec3(0.16) * NdotL;
      lit += vec3(0.55) * pow(NdotH, specExp);
      lit += vec3(fuzz);
      lit *= (1.0 + g * u_grain);
      lit  = clamp(lit, 0.0, 1.0);
    } else if (u_colorMode == 1) {
      vec3 cBright = vec3(0.85, 0.99, 1.00);
      vec3 cMid    = vec3(0.00, 0.55, 1.00);
      vec3 cDeep   = vec3(0.00, 0.02, 0.30);
      float halfL = NdotL * 0.5 + 0.5;
      vec3 base = mix(cDeep, cMid,    smoothstep(0.00, 0.55, halfL));
      base      = mix(base,  cBright, smoothstep(0.55, 1.00, halfL));
      lit  = base;
      lit += vec3(1.0) * pow(NdotH, specExp) * 0.45;
      lit += vec3(fuzz);
      lit *= (1.0 + g * u_grain);
      lit  = clamp(lit, 0.0, 1.0);
    } else {
      vec3 cTop = vec3(0.96);
      vec3 cBot = vec3(0.00);
      float gy  = clamp(wp.y * 0.55 + 0.5, 0.0, 1.0);
      vec3 base = mix(cBot, cTop, pow(gy, 1.5));
      float halfL = NdotL * 0.5 + 0.5;
      lit  = base * (0.75 + 0.25 * halfL);
      lit += vec3(0.92) * pow(NdotH, specExp) * 0.15;
      lit += vec3(fuzz);
      lit *= (1.0 + g * u_grain);
      lit  = clamp(lit, 0.0, 1.0);
    }

    finalCol = lit;
    finalAlpha = 1.0;
  }

  gl_FragColor = vec4(finalCol, finalAlpha);
}
`;

// Lightweight shader for small/glyph-sized blobs. Single metaball
// (~80% of the visible mass) plus low-frequency wavy ripple (~20%)
// — reads as a suspended drop of water bobbing on its surface
// tension. Uses the same uniform set as FS so the same renderer +
// renderBlob() work transparently — uniforms it doesn't reference
// (u_morph, u_smooth, u_aspect, u_grain) are silently ignored.
// Wave amplitude scales with `u_energy` so callers can dial it.
export const SIMPLE_FS = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform vec2  u_res;
uniform float u_fuzz;
uniform float u_grain;       // unused
uniform float u_rim;
uniform float u_rotY;
uniform float u_morph;       // 0 = blob, 1 = morph target (selected by u_morphTarget)
uniform float u_energy;      // wave amplitude scale
uniform float u_smooth;      // unused
uniform vec2  u_aspect;      // unused
uniform int   u_colorMode;
uniform int   u_morphTarget; // 0 = MS 4-square mark, 1 = Teams, 2 = Fitably, 3 = WVN, 4 = Diffui, 5 = Bootcamp BC
uniform sampler2D u_sdfTex;  // baked SDF for the Teams morph target
uniform float u_sdfRange;    // pixel range encoded across the byte; world dist = (sample - 0.5) * 2 * sdfRange / sdfTexSize
uniform float u_sdfTexSize;  // texture dimension in px (square)
uniform float u_sdfWorldHalf;// half-extent of the world region the texture covers
uniform sampler2D u_fitablySdfTex;   // baked SDF for the Fitably morph target
uniform float u_fitablySdfRange;     // see u_sdfRange
uniform float u_fitablySdfTexSize;   // see u_sdfTexSize
uniform float u_fitablySdfWorldHalf; // see u_sdfWorldHalf
uniform sampler2D u_wvnSdfTex;       // baked SDF for the WVN morph target
uniform float u_wvnSdfRange;         // see u_sdfRange
uniform float u_wvnSdfTexSize;       // see u_sdfTexSize
uniform float u_wvnSdfWorldHalf;     // see u_sdfWorldHalf
uniform sampler2D u_diffuiSdfTex;    // baked SDF for the Diffui 3x3 grid morph target
uniform float u_diffuiSdfRange;      // see u_sdfRange
uniform float u_diffuiSdfTexSize;    // see u_sdfTexSize
uniform float u_diffuiSdfWorldHalf;  // see u_sdfWorldHalf
uniform sampler2D u_bcSdfTex;        // baked SDF for the Bootcamp BC morph target
uniform float u_bcSdfRange;          // see u_sdfRange
uniform float u_bcSdfTexSize;        // see u_sdfTexSize
uniform float u_bcSdfWorldHalf;      // see u_sdfWorldHalf

// 2D rounded-box SDF (helper for msMark).
float sdRoundBox2D(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + vec2(r);
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

// SDF of the Microsoft 4-square mark — four rounded squares arranged in a
// 2x2 grid, extruded as a slab in z. Computed in unrotated world space so
// the mark stays facing camera regardless of the blob's spin.
float msMark(vec3 wp) {
  float halfTile = 0.18;
  float gap      = 0.05;
  float corner   = 0.045;
  float depth    = 0.14;
  // Mirror x/y so the four quadrants share one rounded-box computation.
  vec2  q   = vec2(abs(wp.x), abs(wp.y)) - vec2(halfTile + gap * 0.5);
  float dxy = sdRoundBox2D(q, vec2(halfTile), corner);
  // Extrude into z (slab).
  vec2 w = vec2(dxy, abs(wp.z) - depth);
  return length(max(w, 0.0)) + min(max(w.x, w.y), 0.0);
}

// SDF of the Fitably radial-burst mark — sampled from a baked SDF texture.
// Same shape and math as teamsMark, just bound to a separate sampler /
// uniform block so each morph target can have its own texture.
float fitablyMark(vec3 wp) {
  vec2 uvRaw = wp.xy / (2.0 * u_fitablySdfWorldHalf) + 0.5;
  uvRaw.y = 1.0 - uvRaw.y;
  vec2 uvClamped = clamp(uvRaw, 0.0, 1.0);

  float texSample = texture2D(u_fitablySdfTex, uvClamped).r;
  float sdfNorm   = texSample * 2.0 - 1.0;
  float pxToWorld = (2.0 * u_fitablySdfWorldHalf) / u_fitablySdfTexSize;
  float dXY       = sdfNorm * u_fitablySdfRange * pxToWorld;

  vec2  oobUv     = max(vec2(0.0), abs(uvRaw - 0.5) - 0.5);
  float oobWorld  = length(oobUv) * (2.0 * u_fitablySdfWorldHalf);
  dXY += oobWorld;

  vec2 wExt = vec2(dXY, abs(wp.z) - 0.12);
  return length(max(wExt, 0.0)) + min(max(wExt.x, wExt.y), 0.0);
}

// SDF of the WVN "W" mark — sampled from a baked SDF texture. Same shape
// and math as teamsMark / fitablyMark, just bound to its own sampler.
float wvnMark(vec3 wp) {
  vec2 uvRaw = wp.xy / (2.0 * u_wvnSdfWorldHalf) + 0.5;
  uvRaw.y = 1.0 - uvRaw.y;
  vec2 uvClamped = clamp(uvRaw, 0.0, 1.0);

  float texSample = texture2D(u_wvnSdfTex, uvClamped).r;
  float sdfNorm   = texSample * 2.0 - 1.0;
  float pxToWorld = (2.0 * u_wvnSdfWorldHalf) / u_wvnSdfTexSize;
  float dXY       = sdfNorm * u_wvnSdfRange * pxToWorld;

  vec2  oobUv     = max(vec2(0.0), abs(uvRaw - 0.5) - 0.5);
  float oobWorld  = length(oobUv) * (2.0 * u_wvnSdfWorldHalf);
  dXY += oobWorld;

  vec2 wExt = vec2(dXY, abs(wp.z) - 0.12);
  return length(max(wExt, 0.0)) + min(max(wExt.x, wExt.y), 0.0);
}

// SDF of the Diffui 3x3 grid mark — same math as the other texture marks,
// bound to its own sampler so the 9-square pattern can morph independently.
float diffuiMark(vec3 wp) {
  vec2 uvRaw = wp.xy / (2.0 * u_diffuiSdfWorldHalf) + 0.5;
  uvRaw.y = 1.0 - uvRaw.y;
  vec2 uvClamped = clamp(uvRaw, 0.0, 1.0);

  float texSample = texture2D(u_diffuiSdfTex, uvClamped).r;
  float sdfNorm   = texSample * 2.0 - 1.0;
  float pxToWorld = (2.0 * u_diffuiSdfWorldHalf) / u_diffuiSdfTexSize;
  float dXY       = sdfNorm * u_diffuiSdfRange * pxToWorld;

  vec2  oobUv     = max(vec2(0.0), abs(uvRaw - 0.5) - 0.5);
  float oobWorld  = length(oobUv) * (2.0 * u_diffuiSdfWorldHalf);
  dXY += oobWorld;

  vec2 wExt = vec2(dXY, abs(wp.z) - 0.12);
  return length(max(wExt, 0.0)) + min(max(wExt.x, wExt.y), 0.0);
}

// SDF of the Bootcamp Article "BC" mark — same math as the other texture
// marks, bound to its own sampler so the nested frame+line+letters union
// can morph independently.
float bcMark(vec3 wp) {
  vec2 uvRaw = wp.xy / (2.0 * u_bcSdfWorldHalf) + 0.5;
  uvRaw.y = 1.0 - uvRaw.y;
  vec2 uvClamped = clamp(uvRaw, 0.0, 1.0);

  float texSample = texture2D(u_bcSdfTex, uvClamped).r;
  float sdfNorm   = texSample * 2.0 - 1.0;
  float pxToWorld = (2.0 * u_bcSdfWorldHalf) / u_bcSdfTexSize;
  float dXY       = sdfNorm * u_bcSdfRange * pxToWorld;

  vec2  oobUv     = max(vec2(0.0), abs(uvRaw - 0.5) - 0.5);
  float oobWorld  = length(oobUv) * (2.0 * u_bcSdfWorldHalf);
  dXY += oobWorld;

  vec2 wExt = vec2(dXY, abs(wp.z) - 0.12);
  return length(max(wExt, 0.0)) + min(max(wExt.x, wExt.y), 0.0);
}

// SDF of the Microsoft Teams mark — sampled from a baked SDF texture so
// the morph target is the EXACT SVG silhouette rather than an approximation.
// The 2D distance field is extruded into z (slab) to give the morph
// thickness. For points outside the texture footprint we add the additional
// world-space distance to the texture rectangle to keep the SDF correct.
float teamsMark(vec3 wp) {
  // World → texture UV. Texture covers ±u_sdfWorldHalf in xy, centered on
  // origin. SVG y is screen-down, so flip v.
  vec2 uvRaw = wp.xy / (2.0 * u_sdfWorldHalf) + 0.5;
  uvRaw.y = 1.0 - uvRaw.y;
  vec2 uvClamped = clamp(uvRaw, 0.0, 1.0);

  // Read SDF (linear-filtered) from the clamped sample point.
  float texSample = texture2D(u_sdfTex, uvClamped).r;
  // Unpack: 0..1 byte → ±1 normalized → ±sdfRange pixels → world units.
  float sdfNorm   = texSample * 2.0 - 1.0;
  float pxToWorld = (2.0 * u_sdfWorldHalf) / u_sdfTexSize;
  float dXY       = sdfNorm * u_sdfRange * pxToWorld;

  // If the query point is outside the texture rectangle, add the world-
  // space distance from the point to the rectangle (always positive).
  vec2  oobUv     = max(vec2(0.0), abs(uvRaw - 0.5) - 0.5);
  float oobWorld  = length(oobUv) * (2.0 * u_sdfWorldHalf);
  dXY += oobWorld;

  // Slab in z so the silhouette has thickness for the ray marcher.
  vec2 wExt = vec2(dXY, abs(wp.z) - 0.12);
  return length(max(wExt, 0.0)) + min(max(wExt.x, wExt.y), 0.0);
}

float sceneSDF(vec3 wp) {
  // Rotation angle is fully accumulated host-side (see blob.tsx) so we can
  // slow it smoothly as the morph progresses without the "elapsed time
  // retroactively rescaled" jump that multiplying u_time by a changing
  // factor produces. Here we just consume the angle as-is.
  float angle = u_rotY;
  float c = cos(angle);
  float s = sin(angle);
  vec3 p = vec3(wp.x * c + wp.z * s, wp.y, -wp.x * s + wp.z * c);

  // Core sphere — pulled in tight so the heavy wave field can shape
  // the silhouette aggressively. Subtle suspension drift.
  vec3 drift = vec3(
    sin(u_time * 0.55) * 0.018,
    cos(u_time * 0.43) * 0.022,
    sin(u_time * 0.71) * 0.018
  );
  float dSphere = length(p - drift) - 0.36;

  // DEEP FOLDS — low-frequency broad swells that crease the silhouette
  // into multiple visible lobes. Three diagonal-axis product-of-sines
  // mean the folds don't align to a grid.
  float f1 = sin((p.x + p.y) * 4.5 + u_time * 0.80) *
             cos((p.y - p.z) * 4.0 + u_time * 0.55);
  float f2 = sin((p.z + p.x) * 5.0 - u_time * 0.65) *
             cos((p.x - p.y) * 4.5 - u_time * 0.95);
  float f3 = sin((p.y + p.z) * 4.0 + u_time * 0.45) *
             cos((p.z - p.x) * 5.5 + u_time * 0.75);
  float folds = (f1 + f2 + f3) * 0.080;

  // MID RIPPLE — five product-of-sines at mid frequency, four along
  // orthogonal axes plus one diagonal. Carves the broad lobes into
  // smaller bumps so the form reads as continuously folded, not a
  // simple wavy ball.
  float w1 = sin(p.x * 7.0  + u_time * 1.30) * cos(p.y * 6.0  - u_time * 0.90);
  float w2 = sin(p.y * 8.0  - u_time * 1.10) * cos(p.z * 7.0  + u_time * 1.00);
  float w3 = sin(p.z * 6.5  + u_time * 0.80) * cos(p.x * 8.5  + u_time * 1.20);
  float w4 = sin((p.x - p.z) * 9.0 + u_time * 1.45) *
             cos((p.y + p.x) * 7.5 - u_time * 1.05);
  float w5 = sin((p.y - p.x) * 8.0 + u_time * 0.95) *
             cos((p.z + p.y) * 9.5 - u_time * 1.35);
  float primary = (w1 + w2 + w3 + w4 + w5) * 0.058;

  // MICRO-RIPPLE — high-frequency surface shimmer; pushed up so it
  // creates visible texture on the lobes, not just shading.
  float m1 = sin(p.x * 14.0 + u_time * 1.80);
  float m2 = sin(p.y * 13.0 - u_time * 2.00);
  float m3 = sin(p.z * 15.0 + u_time * 1.60);
  float m4 = sin((p.x + p.y + p.z) * 16.0 + u_time * 1.40);
  float micro = (m1 + m2 + m3 + m4) * 0.022;

  // Wave amplitude eases off as we morph — the "bag" relaxes its folds
  // to take on the brick's surface, but never goes fully rigid.
  float waveScale = mix(1.0, 0.18, u_morph);
  float dBlob = dSphere + (folds + primary + micro) * u_energy * waveScale;

  // Pick the morph target SDF (unrotated, so the mark always faces camera).
  float dTarget;
  if (u_morphTarget == 1) {
    dTarget = teamsMark(wp);
  } else if (u_morphTarget == 2) {
    dTarget = fitablyMark(wp);
  } else if (u_morphTarget == 3) {
    dTarget = wvnMark(wp);
  } else if (u_morphTarget == 4) {
    dTarget = diffuiMark(wp);
  } else if (u_morphTarget == 5) {
    dTarget = bcMark(wp);
  } else {
    dTarget = msMark(wp);
  }

  // Linear blend of SDFs ⇒ continuous shape morph. The blob's iso-surface
  // smoothly inflates / deflates into the target iso-surface.
  return mix(dBlob, dTarget, u_morph);
}

vec3 calcNormal(vec3 p) {
  float h = 0.0015;
  vec2 e = vec2(h, 0.0);
  return normalize(vec3(
    sceneSDF(p + e.xyy) - sceneSDF(p - e.xyy),
    sceneSDF(p + e.yxy) - sceneSDF(p - e.yxy),
    sceneSDF(p + e.yyx) - sceneSDF(p - e.yyx)
  ));
}

void main() {
  vec2 uv = v_uv * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  vec3 ro = vec3(uv * 0.99, 2.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);

  float td = 0.0;
  bool hit = false;
  // Wavier SDF stops being a true distance field, so step
  // conservatively (× 0.4) and bump the iteration cap so we don't
  // miss the surface at deep wave troughs.
  for (int i = 0; i < 80; i++) {
    vec3 rp = ro + rd * td;
    float d = sceneSDF(rp);
    if (d < 0.001) { hit = true; break; }
    td += max(d * 0.40, 0.004);
    if (td > 4.0) break;
  }

  vec3 finalCol = vec3(0.030);
  float finalAlpha = 0.0;

  if (hit) {
    vec3 wp = ro + rd * td;
    vec3 N  = calcNormal(wp);
    vec3 V  = -rd;
    vec3 L  = normalize(vec3(-0.42, 0.52, 0.74));
    vec3 H  = normalize(L + V);

    float NdotL = max(dot(N, L), 0.0);
    float NdotV = max(dot(N, V), 0.0);
    float NdotH = max(dot(N, H), 0.0);

    float specExp = 28.0;
    float fresnel = pow(1.0 - NdotV, u_rim);
    float fuzz    = fresnel * (0.25 + 0.75 * NdotL) * u_fuzz;

    vec3 lit;
    if (u_colorMode == 0) {
      lit  = vec3(0.020);
      lit += vec3(0.16) * NdotL;
      lit += vec3(0.55) * pow(NdotH, specExp);
      lit += vec3(fuzz);
    } else if (u_colorMode == 1) {
      vec3 cBright = vec3(0.85, 0.99, 1.00);
      vec3 cMid    = vec3(0.00, 0.55, 1.00);
      vec3 cDeep   = vec3(0.00, 0.02, 0.30);
      float halfL = NdotL * 0.5 + 0.5;
      vec3 base = mix(cDeep, cMid,    smoothstep(0.00, 0.55, halfL));
      base      = mix(base,  cBright, smoothstep(0.55, 1.00, halfL));
      lit  = base;
      lit += vec3(1.0) * pow(NdotH, specExp) * 0.45;
      lit += vec3(fuzz);
    } else {
      vec3 cTop = vec3(0.96);
      vec3 cBot = vec3(0.00);
      float gy  = clamp(wp.y * 0.55 + 0.5, 0.0, 1.0);
      vec3 base = mix(cBot, cTop, pow(gy, 1.5));
      float halfL = NdotL * 0.5 + 0.5;
      lit  = base * (0.75 + 0.25 * halfL);
      lit += vec3(0.92) * pow(NdotH, specExp) * 0.15;
      lit += vec3(fuzz);
    }

    lit = clamp(lit, 0.0, 1.0);
    finalCol = lit;
    finalAlpha = 1.0;
  }

  gl_FragColor = vec4(finalCol, finalAlpha);
}
`;

export function initBlobRenderer(canvas, opts = {}) {
  if (!canvas) return null;
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
    preserveDrawingBuffer: true,
  });
  if (!gl) return null;

  const compile = (type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("blob shader compile failed:", gl.getShaderInfoLog(sh));
      gl.deleteShader(sh);
      return null;
    }
    return sh;
  };

  const fragmentSrc = opts.simple ? SIMPLE_FS : FS;
  const vs = compile(gl.VERTEX_SHADER, VS);
  const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    // eslint-disable-next-line no-console
    console.error("blob program link failed:", gl.getProgramInfoLog(program));
    return null;
  }

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const renderer = {
    canvas, gl, program, buffer,
    aPos:       gl.getAttribLocation(program, "a_position"),
    uTime:      gl.getUniformLocation(program, "u_time"),
    uRes:       gl.getUniformLocation(program, "u_res"),
    uFuzz:      gl.getUniformLocation(program, "u_fuzz"),
    uGrain:     gl.getUniformLocation(program, "u_grain"),
    uRim:       gl.getUniformLocation(program, "u_rim"),
    uRotY:      gl.getUniformLocation(program, "u_rotY"),
    uMorph:     gl.getUniformLocation(program, "u_morph"),
    uEnergy:    gl.getUniformLocation(program, "u_energy"),
    uSmooth:    gl.getUniformLocation(program, "u_smooth"),
    uAspect:    gl.getUniformLocation(program, "u_aspect"),
    uColorMode:           gl.getUniformLocation(program, "u_colorMode"),
    uMorphTarget:         gl.getUniformLocation(program, "u_morphTarget"),
    uSdfTex:              gl.getUniformLocation(program, "u_sdfTex"),
    uSdfRange:            gl.getUniformLocation(program, "u_sdfRange"),
    uSdfTexSize:          gl.getUniformLocation(program, "u_sdfTexSize"),
    uSdfWorldHalf:        gl.getUniformLocation(program, "u_sdfWorldHalf"),
    uFitablySdfTex:       gl.getUniformLocation(program, "u_fitablySdfTex"),
    uFitablySdfRange:     gl.getUniformLocation(program, "u_fitablySdfRange"),
    uFitablySdfTexSize:   gl.getUniformLocation(program, "u_fitablySdfTexSize"),
    uFitablySdfWorldHalf: gl.getUniformLocation(program, "u_fitablySdfWorldHalf"),
    uWvnSdfTex:           gl.getUniformLocation(program, "u_wvnSdfTex"),
    uWvnSdfRange:         gl.getUniformLocation(program, "u_wvnSdfRange"),
    uWvnSdfTexSize:       gl.getUniformLocation(program, "u_wvnSdfTexSize"),
    uWvnSdfWorldHalf:     gl.getUniformLocation(program, "u_wvnSdfWorldHalf"),
    uDiffuiSdfTex:        gl.getUniformLocation(program, "u_diffuiSdfTex"),
    uDiffuiSdfRange:      gl.getUniformLocation(program, "u_diffuiSdfRange"),
    uDiffuiSdfTexSize:    gl.getUniformLocation(program, "u_diffuiSdfTexSize"),
    uDiffuiSdfWorldHalf:  gl.getUniformLocation(program, "u_diffuiSdfWorldHalf"),
    uBcSdfTex:            gl.getUniformLocation(program, "u_bcSdfTex"),
    uBcSdfRange:          gl.getUniformLocation(program, "u_bcSdfRange"),
    uBcSdfTexSize:        gl.getUniformLocation(program, "u_bcSdfTexSize"),
    uBcSdfWorldHalf:      gl.getUniformLocation(program, "u_bcSdfWorldHalf"),
    sdfTexture:           null,
    sdfRange:             0,
    sdfTexSize:           0,
    sdfWorldHalf:         0.5,
    fitablySdfTexture:    null,
    fitablySdfRange:      0,
    fitablySdfTexSize:    0,
    fitablySdfWorldHalf:  0.5,
    wvnSdfTexture:        null,
    wvnSdfRange:          0,
    wvnSdfTexSize:        0,
    wvnSdfWorldHalf:      0.5,
    diffuiSdfTexture:     null,
    diffuiSdfRange:       0,
    diffuiSdfTexSize:     0,
    diffuiSdfWorldHalf:   0.5,
    bcSdfTexture:         null,
    bcSdfRange:           0,
    bcSdfTexSize:         0,
    bcSdfWorldHalf:       0.5,
    energy: opts.energy ?? 1.0,
    grain:  opts.grain  ?? 0.05,
  };

  resizeBlobRenderer(renderer);
  return renderer;
}

export function resizeBlobRenderer(renderer) {
  if (!renderer || !renderer.canvas || !renderer.gl) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  const cssW = renderer.canvas.clientWidth;
  const cssH = renderer.canvas.clientHeight;
  const w = Math.max(1, Math.round(cssW * dpr));
  const h = Math.max(1, Math.round(cssH * dpr));
  if (renderer.canvas.width !== w || renderer.canvas.height !== h) {
    renderer.canvas.width = w;
    renderer.canvas.height = h;
    renderer.gl.viewport(0, 0, w, h);
  }
}

export function renderBlob(renderer, t, params = {}) {
  if (!renderer || !renderer.gl || !renderer.program) return;
  const gl = renderer.gl;
  resizeBlobRenderer(renderer);
  gl.useProgram(renderer.program);
  gl.bindBuffer(gl.ARRAY_BUFFER, renderer.buffer);
  gl.enableVertexAttribArray(renderer.aPos);
  gl.vertexAttribPointer(renderer.aPos, 2, gl.FLOAT, false, 0, 0);
  gl.uniform1f(renderer.uTime,  t);
  gl.uniform2f(renderer.uRes,   renderer.canvas.width, renderer.canvas.height);
  gl.uniform1f(renderer.uFuzz,  params.fuzz ?? 1.5);
  gl.uniform1f(renderer.uGrain, renderer.grain);
  gl.uniform1f(renderer.uRim,   params.rim ?? 4.0);
  gl.uniform1f(renderer.uRotY,  params.rotateRad ?? 0);
  gl.uniform1f(renderer.uMorph, params.morph ?? 0);
  gl.uniform1f(renderer.uEnergy, renderer.energy);
  gl.uniform1f(renderer.uSmooth, params.smooth ?? 0);
  gl.uniform2f(
    renderer.uAspect,
    renderer.canvas.height > 0 ? renderer.canvas.width / renderer.canvas.height : 1.0,
    1.0,
  );
  gl.uniform1i(renderer.uColorMode, params.colorMode ?? 1);
  if (renderer.uMorphTarget) {
    gl.uniform1i(renderer.uMorphTarget, params.morphTarget ?? 0);
  }
  // Always set the SDF "shape" uniforms to safe defaults so dead-branch
  // evaluation in the shader doesn't divide by zero (NaN poisons fragments
  // even when the if-branch that produced it is logically unselected).
  if (renderer.uSdfRange)     gl.uniform1f(renderer.uSdfRange,     renderer.sdfRange     || 64);
  if (renderer.uSdfTexSize)   gl.uniform1f(renderer.uSdfTexSize,   renderer.sdfTexSize   || 256);
  if (renderer.uSdfWorldHalf) gl.uniform1f(renderer.uSdfWorldHalf, renderer.sdfWorldHalf || 0.5);
  if (renderer.sdfTexture && renderer.uSdfTex) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, renderer.sdfTexture);
    gl.uniform1i(renderer.uSdfTex, 0);
  }
  if (renderer.uFitablySdfRange)     gl.uniform1f(renderer.uFitablySdfRange,     renderer.fitablySdfRange     || 64);
  if (renderer.uFitablySdfTexSize)   gl.uniform1f(renderer.uFitablySdfTexSize,   renderer.fitablySdfTexSize   || 256);
  if (renderer.uFitablySdfWorldHalf) gl.uniform1f(renderer.uFitablySdfWorldHalf, renderer.fitablySdfWorldHalf || 0.5);
  if (renderer.fitablySdfTexture && renderer.uFitablySdfTex) {
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, renderer.fitablySdfTexture);
    gl.uniform1i(renderer.uFitablySdfTex, 1);
  }
  if (renderer.uWvnSdfRange)     gl.uniform1f(renderer.uWvnSdfRange,     renderer.wvnSdfRange     || 64);
  if (renderer.uWvnSdfTexSize)   gl.uniform1f(renderer.uWvnSdfTexSize,   renderer.wvnSdfTexSize   || 256);
  if (renderer.uWvnSdfWorldHalf) gl.uniform1f(renderer.uWvnSdfWorldHalf, renderer.wvnSdfWorldHalf || 0.5);
  if (renderer.wvnSdfTexture && renderer.uWvnSdfTex) {
    gl.activeTexture(gl.TEXTURE2);
    gl.bindTexture(gl.TEXTURE_2D, renderer.wvnSdfTexture);
    gl.uniform1i(renderer.uWvnSdfTex, 2);
  }
  if (renderer.uDiffuiSdfRange)     gl.uniform1f(renderer.uDiffuiSdfRange,     renderer.diffuiSdfRange     || 64);
  if (renderer.uDiffuiSdfTexSize)   gl.uniform1f(renderer.uDiffuiSdfTexSize,   renderer.diffuiSdfTexSize   || 256);
  if (renderer.uDiffuiSdfWorldHalf) gl.uniform1f(renderer.uDiffuiSdfWorldHalf, renderer.diffuiSdfWorldHalf || 0.5);
  if (renderer.diffuiSdfTexture && renderer.uDiffuiSdfTex) {
    gl.activeTexture(gl.TEXTURE3);
    gl.bindTexture(gl.TEXTURE_2D, renderer.diffuiSdfTexture);
    gl.uniform1i(renderer.uDiffuiSdfTex, 3);
  }
  if (renderer.uBcSdfRange)     gl.uniform1f(renderer.uBcSdfRange,     renderer.bcSdfRange     || 64);
  if (renderer.uBcSdfTexSize)   gl.uniform1f(renderer.uBcSdfTexSize,   renderer.bcSdfTexSize   || 256);
  if (renderer.uBcSdfWorldHalf) gl.uniform1f(renderer.uBcSdfWorldHalf, renderer.bcSdfWorldHalf || 0.5);
  if (renderer.bcSdfTexture && renderer.uBcSdfTex) {
    gl.activeTexture(gl.TEXTURE4);
    gl.bindTexture(gl.TEXTURE_2D, renderer.bcSdfTexture);
    gl.uniform1i(renderer.uBcSdfTex, 4);
  }
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

export function disposeBlobRenderer(renderer) {
  if (!renderer || !renderer.gl) return;
  if (renderer.program)           renderer.gl.deleteProgram(renderer.program);
  if (renderer.buffer)            renderer.gl.deleteBuffer(renderer.buffer);
  if (renderer.sdfTexture)        renderer.gl.deleteTexture(renderer.sdfTexture);
  if (renderer.fitablySdfTexture) renderer.gl.deleteTexture(renderer.fitablySdfTexture);
  if (renderer.wvnSdfTexture)     renderer.gl.deleteTexture(renderer.wvnSdfTexture);
  if (renderer.diffuiSdfTexture)  renderer.gl.deleteTexture(renderer.diffuiSdfTexture);
  if (renderer.bcSdfTexture)      renderer.gl.deleteTexture(renderer.bcSdfTexture);
}

// Internal: upload single-channel LUMINANCE SDF data into the given
// renderer-key texture slot. Used by the public per-target uploaders.
function uploadSdf(renderer, texKey, data, size) {
  const gl = renderer.gl;
  if (!renderer[texKey]) renderer[texKey] = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, renderer[texKey]);
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.LUMINANCE, size, size, 0,
    gl.LUMINANCE, gl.UNSIGNED_BYTE, data,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
}

// Upload a baked SDF texture for the Teams morph target.
//   sdfRange   — pixel-distance range packed across the byte (±sdfRange)
//   worldHalf  — half-extent (in world units) of the region the texture
//                covers; the shader maps wp.xy → uv using this.
export function setBlobSdfTexture(renderer, data, size, sdfRange, worldHalf) {
  if (!renderer || !renderer.gl) return;
  uploadSdf(renderer, "sdfTexture", data, size);
  renderer.sdfTexSize   = size;
  renderer.sdfRange     = sdfRange;
  renderer.sdfWorldHalf = worldHalf;
}

// Upload a baked SDF texture for the Fitably morph target.
export function setBlobFitablySdfTexture(renderer, data, size, sdfRange, worldHalf) {
  if (!renderer || !renderer.gl) return;
  uploadSdf(renderer, "fitablySdfTexture", data, size);
  renderer.fitablySdfTexSize   = size;
  renderer.fitablySdfRange     = sdfRange;
  renderer.fitablySdfWorldHalf = worldHalf;
}

// Upload a baked SDF texture for the WVN morph target.
export function setBlobWvnSdfTexture(renderer, data, size, sdfRange, worldHalf) {
  if (!renderer || !renderer.gl) return;
  uploadSdf(renderer, "wvnSdfTexture", data, size);
  renderer.wvnSdfTexSize   = size;
  renderer.wvnSdfRange     = sdfRange;
  renderer.wvnSdfWorldHalf = worldHalf;
}

// Upload a baked SDF texture for the Diffui morph target.
export function setBlobDiffuiSdfTexture(renderer, data, size, sdfRange, worldHalf) {
  if (!renderer || !renderer.gl) return;
  uploadSdf(renderer, "diffuiSdfTexture", data, size);
  renderer.diffuiSdfTexSize   = size;
  renderer.diffuiSdfRange     = sdfRange;
  renderer.diffuiSdfWorldHalf = worldHalf;
}

// Upload a baked SDF texture for the Bootcamp BC morph target.
export function setBlobBcSdfTexture(renderer, data, size, sdfRange, worldHalf) {
  if (!renderer || !renderer.gl) return;
  uploadSdf(renderer, "bcSdfTexture", data, size);
  renderer.bcSdfTexSize   = size;
  renderer.bcSdfRange     = sdfRange;
  renderer.bcSdfWorldHalf = worldHalf;
}
