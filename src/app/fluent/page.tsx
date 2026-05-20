import { hasCaseAccess } from "../_actions/case-access";
import PasswordGate from "../_components/password-gate";
import FluentContent from "./content";

// Server component: cookie check happens before any protected markup is
// rendered or shipped to the browser. If the cookie is missing/invalid,
// the gate is returned instead — the protected content never reaches
// the client.
export default async function FluentPage() {
  if (!(await hasCaseAccess())) {
    return <PasswordGate title="Microsoft Fluent" />;
  }
  return <FluentContent />;
}
