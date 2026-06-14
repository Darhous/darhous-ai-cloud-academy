import type { WorkflowDetail } from "../types";

// Heavy per-workflow content. One small file each — add a new workflow by
// dropping a [slug].ts file here + a public/automation/workflows-json/[slug].json,
// then registering it below. No template/route/filter changes needed.
import studentWelcomeFlow from "./student-welcome-flow";
import googleFormToCrm from "./google-form-to-crm";
import dailyAiEmailBrief from "./daily-ai-email-brief";
import weeklySalesReport from "./weekly-sales-report";
import leadFollowupWhatsapp from "./lead-followup-whatsapp";
import socialContentApproval from "./social-content-approval";
import pdfCertificates from "./pdf-certificates";
import hrCandidateScreening from "./hr-candidate-screening";
import customerRequestRouting from "./customer-request-routing";
import invoiceArchiveBot from "./invoice-archive-bot";
import websiteLeadToWhatsapp from "./website-lead-to-whatsapp";
import courseRegistrationPipeline from "./course-registration-pipeline";
import attendanceAlerts from "./attendance-alerts";
import hrOnboardingPack from "./hr-onboarding-pack";
import abandonedCartReminder from "./abandoned-cart-reminder";
import driveUploadNotify from "./drive-upload-notify";
import meetingSummaryDistribution from "./meeting-summary-distribution";
import crmRenewalReminder from "./crm-renewal-reminder";
import appointmentConfirmation from "./appointment-confirmation";
import contentRepurposePipeline from "./content-repurpose-pipeline";
import expenseReportApproval from "./expense-report-approval";
import customerFeedbackRouting from "./customer-feedback-routing";
import newsletterSubscriberWelcome from "./newsletter-subscriber-welcome";
import projectTaskFromEmail from "./project-task-from-email";
import inventoryLowStockAlert from "./inventory-low-stock-alert";
import socialMediaPostScheduler from "./social-media-post-scheduler";
import clientInvoiceGenerator from "./client-invoice-generator";
import supportTicketAutoAssign from "./support-ticket-auto-assign";
import employeeBirthdayReminder from "./employee-birthday-reminder";
import ecommerceNewOrderNotify from "./ecommerce-new-order-notify";
import aiVideoFactory from "./ai-video-factory";

const ALL: WorkflowDetail[] = [
  aiVideoFactory,
  studentWelcomeFlow,
  googleFormToCrm,
  dailyAiEmailBrief,
  weeklySalesReport,
  leadFollowupWhatsapp,
  socialContentApproval,
  pdfCertificates,
  hrCandidateScreening,
  customerRequestRouting,
  invoiceArchiveBot,
  websiteLeadToWhatsapp,
  courseRegistrationPipeline,
  attendanceAlerts,
  hrOnboardingPack,
  abandonedCartReminder,
  driveUploadNotify,
  meetingSummaryDistribution,
  crmRenewalReminder,
  appointmentConfirmation,
  contentRepurposePipeline,
  expenseReportApproval,
  customerFeedbackRouting,
  newsletterSubscriberWelcome,
  projectTaskFromEmail,
  inventoryLowStockAlert,
  socialMediaPostScheduler,
  clientInvoiceGenerator,
  supportTicketAutoAssign,
  employeeBirthdayReminder,
  ecommerceNewOrderNotify,
];

const BY_ID: Record<string, WorkflowDetail> = Object.fromEntries(ALL.map((d) => [d.id, d]));

export function getWorkflowDetail(slug: string): WorkflowDetail | undefined {
  return BY_ID[slug];
}

export const workflowDetailIds = ALL.map((d) => d.id);
