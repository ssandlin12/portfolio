import { hasCaseAccess } from "../_actions/case-access";
import PasswordGate from "../_components/password-gate";
import TeamsContent from "./content";

export default async function TeamsPage() {
  if (!(await hasCaseAccess())) {
    return <PasswordGate title="Microsoft Teams" />;
  }
  return <TeamsContent />;
}
