import { hasCaseAccess } from "../_actions/case-access";
import PasswordGate from "../_components/password-gate";
import AthenahealthContent from "./content";

export default async function AthenahealthPage() {
  if (!(await hasCaseAccess())) {
    return <PasswordGate title="Athenahealth" />;
  }

  return <AthenahealthContent />;
}
