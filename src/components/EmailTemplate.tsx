import * as React from "react";
import { Tailwind } from "@react-email/tailwind";

interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
}) => (
  <Tailwind>  
    <div>
      <h1>Welcome, {firstName}!</h1>
    </div>
  </Tailwind>
);

export default EmailTemplate;