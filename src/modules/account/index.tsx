import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LangProps } from "@/interfaces/component";
import type { UserAttributes } from "@/models/user";
import { memo } from "react";
import PointSection from "../shared/point-section";
import { CheckCircle2 } from "lucide-react";

export interface AccountPageProps extends LangProps {
  user: UserAttributes;
}

function AccountPage({ user, lang }: AccountPageProps) {
  return (
    <Card className="max-w-3xl w-full mx-auto">
      <CardHeader>
        <CardTitle as="h2">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-2">
          <hgroup className="flex justify-between items-center">
            <h3 className="font-bold">{user.name}</h3>
            <div className="flex justify-between items-center gap-2">
              <p className="flex justify-start items-center">{user.email}</p>
              {user.verified && (
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              )}
            </div>
          </hgroup>

          <PointSection lang={lang} />
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(AccountPage);
