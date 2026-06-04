import { redirect } from "next/navigation";

/** Redirect old language verify URLs to the new unified verify page */
export default async function OldLanguageVerifyRedirect({
  params,
}: {
  params: Promise<{ locale: string; certId: string }>;
}) {
  const { locale, certId } = await params;
  redirect(`/${locale}/certificates/verify/${certId}`);
}
