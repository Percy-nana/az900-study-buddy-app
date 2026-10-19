export type DomainCode = 'cloud' | 'arch' | 'gov';

export const DOMAIN_LABELS: Record<DomainCode, string> = {
  cloud: 'Cloud Concepts',
  arch: 'Azure Architecture & Services',
  gov: 'Management & Governance',
};

export const ALL_DOMAINS: DomainCode[] = ['cloud', 'arch', 'gov'];

export interface QuestionOption {
  text: string;
  correct: boolean;
  why: string;
}

export interface Question {
  id: string;
  domain: DomainCode;
  question: string;
  options: QuestionOption[];
}

export const QUESTIONS: Question[] = [
  {
    id: 'c1',
    domain: 'cloud',
    question:
      'Your team runs virtual machines in the cloud and must apply operating system patches themselves. Which service model is this?',
    options: [
      {
        text: 'Infrastructure as a Service (IaaS)',
        correct: true,
        why: 'With IaaS the provider runs the physical hardware, but you manage the OS, patches, and everything above it.',
      },
      {
        text: 'Platform as a Service (PaaS)',
        correct: false,
        why: 'In PaaS the provider manages the OS and runtime; you only manage your app and data.',
      },
      {
        text: 'Software as a Service (SaaS)',
        correct: false,
        why: 'In SaaS the provider manages nearly everything; you just use the software.',
      },
      {
        text: 'Serverless',
        correct: false,
        why: 'Serverless hides the servers entirely, so there is no OS for you to patch.',
      },
    ],
  },
  {
    id: 'c2',
    domain: 'cloud',
    question:
      'Under the shared responsibility model, which item is the customer ALWAYS responsible for, whatever the service model?',
    options: [
      {
        text: 'Their data and who has access to it',
        correct: true,
        why: 'Information, data, and identities/access stay with the customer in every model, including SaaS.',
      },
      {
        text: 'Physical security of the datacenter',
        correct: false,
        why: 'The cloud provider always owns physical datacenter security.',
      },
      {
        text: 'Replacing failed network hardware',
        correct: false,
        why: 'Physical hosts and networking are the provider\u2019s job.',
      },
      {
        text: 'Patching the hypervisor',
        correct: false,
        why: 'The hypervisor sits in the provider\u2019s layer of the stack.',
      },
    ],
  },
  {
    id: 'c3',
    domain: 'cloud',
    question:
      'A startup pays only for the compute minutes it actually uses each month, with no upfront hardware purchase. Which pricing model is this?',
    options: [
      {
        text: 'Consumption-based',
        correct: true,
        why: 'You pay for what you use, when you use it.',
      },
      {
        text: 'Fixed annual licence',
        correct: false,
        why: 'A fixed licence is paid regardless of how much you use.',
      },
      {
        text: 'Upfront capital purchase',
        correct: false,
        why: 'Buying hardware up front is the opposite of paying per use.',
      },
      {
        text: 'Reserved-only billing',
        correct: false,
        why: 'Reservations commit you to a term in exchange for a discount; they are not pay-per-use.',
      },
    ],
  },
  {
    id: 'c4',
    domain: 'cloud',
    question:
      'A ticketing website automatically adds more instances when a big event goes on sale and removes them afterwards. Which cloud benefit is this?',
    options: [
      {
        text: 'Elasticity',
        correct: true,
        why: 'Elasticity means resources grow and shrink automatically to match demand.',
      },
      {
        text: 'Disaster recovery',
        correct: false,
        why: 'Disaster recovery is about restoring service after an outage, not matching demand.',
      },
      {
        text: 'Data sovereignty',
        correct: false,
        why: 'Data sovereignty is about which country\u2019s laws apply to your data.',
      },
      {
        text: 'Manual capacity planning',
        correct: false,
        why: 'The scenario is automatic, so it is the opposite of manual planning.',
      },
    ],
  },
  {
    id: 'c5',
    domain: 'cloud',
    question:
      'A bank keeps sensitive customer records in its own datacenter but uses a public cloud for seasonal workloads. Which cloud model is this?',
    options: [
      {
        text: 'Hybrid cloud',
        correct: true,
        why: 'Hybrid combines on-premises or private infrastructure with a public cloud.',
      },
      {
        text: 'Public cloud only',
        correct: false,
        why: 'Part of the workload stays in the bank\u2019s own datacenter, so it is not public-only.',
      },
      {
        text: 'Private cloud only',
        correct: false,
        why: 'The bank also uses a public cloud, so it is not private-only.',
      },
      {
        text: 'Community cloud',
        correct: false,
        why: 'A community cloud is shared by organisations with common concerns, which is not described here.',
      },
    ],
  },
  {
    id: 'c6',
    domain: 'cloud',
    question:
      'Moving from buying servers to using cloud services mainly shifts spending from which category to which?',
    options: [
      {
        text: 'Capital expenditure (CapEx) to operational expenditure (OpEx)',
        correct: true,
        why: 'Up-front hardware purchases (CapEx) become ongoing pay-as-you-go costs (OpEx).',
      },
      {
        text: 'Operational expenditure to capital expenditure',
        correct: false,
        why: 'This is backwards; the cloud reduces up-front capital spend.',
      },
      {
        text: 'Variable cost to fixed cost',
        correct: false,
        why: 'The cloud generally makes costs more variable, not more fixed.',
      },
      {
        text: 'Public spending to private spending',
        correct: false,
        why: 'This is not an accounting category used in cloud cost models.',
      },
    ],
  },
  {
    id: 'a1',
    domain: 'arch',
    question:
      'Which Azure construct is a logical container that holds related resources so you can deploy, manage, and delete them as a unit?',
    options: [
      {
        text: 'Resource group',
        correct: true,
        why: 'A resource group groups related resources for deployment and lifecycle management.',
      },
      {
        text: 'Subscription',
        correct: false,
        why: 'A subscription is a billing and access boundary that contains resource groups.',
      },
      {
        text: 'Management group',
        correct: false,
        why: 'Management groups organise multiple subscriptions, not individual resources.',
      },
      {
        text: 'Availability zone',
        correct: false,
        why: 'An availability zone is a physical location inside a region, not a logical container.',
      },
    ],
  },
  {
    id: 'a2',
    domain: 'arch',
    question: 'What is an Azure availability zone?',
    options: [
      {
        text: 'A physically separate location inside a region with its own power, cooling and networking',
        correct: true,
        why: 'Spreading workloads across zones protects against a single datacenter failure.',
      },
      {
        text: 'A group of subscriptions sharing one policy',
        correct: false,
        why: 'That describes a management group.',
      },
      {
        text: 'A billing region for invoicing',
        correct: false,
        why: 'Availability zones are about resilience, not billing.',
      },
      {
        text: 'A virtual network segment',
        correct: false,
        why: 'Subnets segment networks; zones are physical datacenter locations.',
      },
    ],
  },
  {
    id: 'a3',
    domain: 'arch',
    question:
      'You need to store millions of images and static website assets as unstructured objects. Which Azure storage service fits best?',
    options: [
      {
        text: 'Azure Blob Storage',
        correct: true,
        why: 'Blob Storage is designed for large amounts of unstructured data such as images, video and backups.',
      },
      {
        text: 'Azure Files',
        correct: false,
        why: 'Azure Files provides managed file shares (for example over SMB), not general object storage.',
      },
      {
        text: 'Azure Queue Storage',
        correct: false,
        why: 'Queue Storage holds messages for asynchronous processing.',
      },
      {
        text: 'Azure Table Storage',
        correct: false,
        why: 'Table Storage is for structured NoSQL key-value data.',
      },
    ],
  },
  {
    id: 'a4',
    domain: 'arch',
    question:
      'You want small pieces of code to run only when an event occurs, without managing servers. Which Azure service fits?',
    options: [
      {
        text: 'Azure Functions',
        correct: true,
        why: 'Functions is event-driven serverless compute: code runs on triggers and you do not manage servers.',
      },
      {
        text: 'Azure Virtual Machines',
        correct: false,
        why: 'VMs require you to manage the OS and scaling yourself.',
      },
      {
        text: 'Azure Virtual Desktop',
        correct: false,
        why: 'It delivers remote desktops and apps to users, not event-driven code.',
      },
      {
        text: 'Azure Kubernetes Service',
        correct: false,
        why: 'AKS orchestrates containers, which means more infrastructure to manage than serverless functions.',
      },
    ],
  },
  {
    id: 'a5',
    domain: 'arch',
    question:
      'A company wants an encrypted connection from its office network to Azure that travels over the public internet. Which option fits?',
    options: [
      {
        text: 'VPN Gateway',
        correct: true,
        why: 'A VPN gateway builds encrypted tunnels over the public internet.',
      },
      {
        text: 'Azure ExpressRoute',
        correct: false,
        why: 'ExpressRoute is a private dedicated connection that does NOT go over the public internet.',
      },
      {
        text: 'Azure DNS',
        correct: false,
        why: 'DNS resolves names; it does not connect networks.',
      },
      {
        text: 'Azure Load Balancer',
        correct: false,
        why: 'A load balancer distributes traffic across backend resources.',
      },
    ],
  },
  {
    id: 'a6',
    domain: 'arch',
    question:
      'Which service provides cloud-based identity and access management, including single sign-on and multifactor authentication?',
    options: [
      {
        text: 'Microsoft Entra ID',
        correct: true,
        why: 'Entra ID (formerly Azure Active Directory) is Microsoft\u2019s cloud identity and access service.',
      },
      {
        text: 'Azure Policy',
        correct: false,
        why: 'Policy audits and enforces resource rules; it does not sign users in.',
      },
      {
        text: 'Azure Monitor',
        correct: false,
        why: 'Monitor collects telemetry and alerts.',
      },
      {
        text: 'Azure Key Vault',
        correct: false,
        why: 'Key Vault stores secrets, keys and certificates, not user identities.',
      },
    ],
  },
  {
    id: 'g1',
    domain: 'gov',
    question:
      'You must ensure that new resources can only be created in approved regions. Which service enforces and assesses that standard?',
    options: [
      {
        text: 'Azure Policy',
        correct: true,
        why: 'Policy defines rules for resources and can deny or audit non-compliant ones.',
      },
      {
        text: 'Azure role-based access control (RBAC)',
        correct: false,
        why: 'RBAC controls who can do what, not which configurations are allowed.',
      },
      {
        text: 'Resource lock',
        correct: false,
        why: 'Locks prevent deletion or modification of specific resources, not rule enforcement across regions.',
      },
      {
        text: 'Azure Advisor',
        correct: false,
        why: 'Advisor gives recommendations; it does not enforce standards.',
      },
    ],
  },
  {
    id: 'g2',
    domain: 'gov',
    question:
      'A critical production database must be protected from accidental deletion, even by people who have permission to manage it. What should you apply?',
    options: [
      {
        text: 'A resource lock (CanNotDelete)',
        correct: true,
        why: 'Locks override permissions to block accidental deletion or modification until the lock is removed.',
      },
      {
        text: 'A tag',
        correct: false,
        why: 'Tags are labels for organising and cost tracking; they do not block actions.',
      },
      {
        text: 'Azure Monitor alert',
        correct: false,
        why: 'An alert tells you something happened; it does not stop it.',
      },
      {
        text: 'A bigger VM size',
        correct: false,
        why: 'Resizing has no effect on deletion protection.',
      },
    ],
  },
  {
    id: 'g3',
    domain: 'gov',
    question:
      'Which tool gives personalised recommendations to improve reliability, security, performance, cost and operational excellence?',
    options: [
      {
        text: 'Azure Advisor',
        correct: true,
        why: 'Advisor analyses your resources and recommends improvements across those five pillars.',
      },
      {
        text: 'Azure Service Health',
        correct: false,
        why: 'Service Health tells you about Azure service incidents that affect you.',
      },
      {
        text: 'Azure Policy',
        correct: false,
        why: 'Policy enforces rules rather than suggesting optimisations.',
      },
      {
        text: 'Azure Arc',
        correct: false,
        why: 'Arc extends Azure management to resources outside Azure.',
      },
    ],
  },
  {
    id: 'g4',
    domain: 'gov',
    question:
      'Before deploying, you want to estimate the monthly cost of a planned set of Azure services. Which tool should you use?',
    options: [
      {
        text: 'Pricing calculator',
        correct: true,
        why: 'The pricing calculator estimates the cost of services you plan to use.',
      },
      {
        text: 'Total Cost of Ownership (TCO) calculator',
        correct: false,
        why: 'The TCO calculator compares running workloads on-premises versus in Azure.',
      },
      {
        text: 'Microsoft Cost Management',
        correct: false,
        why: 'Cost Management analyses and controls what you have actually spent.',
      },
      {
        text: 'Azure Service Health',
        correct: false,
        why: 'Service Health reports on service issues, not cost.',
      },
    ],
  },
  {
    id: 'g5',
    domain: 'gov',
    question:
      'Which service collects and analyses telemetry such as metrics and logs from your Azure and on-premises resources, and can raise alerts?',
    options: [
      {
        text: 'Azure Monitor',
        correct: true,
        why: 'Azure Monitor gathers metrics and logs and supports alerting and analysis.',
      },
      {
        text: 'Microsoft Defender for Cloud',
        correct: false,
        why: 'Defender for Cloud focuses on security posture and threat protection.',
      },
      {
        text: 'Azure Service Health',
        correct: false,
        why: 'Service Health reports Azure platform issues, not your own resource telemetry.',
      },
      {
        text: 'Azure Migrate',
        correct: false,
        why: 'Migrate helps move workloads to Azure.',
      },
    ],
  },
  {
    id: 'g6',
    domain: 'gov',
    question:
      'You manage servers in your own datacenter and in another cloud and want to manage them from the Azure control plane. Which service helps?',
    options: [
      {
        text: 'Azure Arc',
        correct: true,
        why: 'Arc projects non-Azure servers and other resources into Azure for unified management.',
      },
      {
        text: 'Azure Migrate',
        correct: false,
        why: 'Migrate moves workloads into Azure rather than managing them in place.',
      },
      {
        text: 'Azure Cloud Shell',
        correct: false,
        why: 'Cloud Shell is a browser-based command line, not a management bridge.',
      },
      {
        text: 'Azure ExpressRoute',
        correct: false,
        why: 'ExpressRoute is a private network connection.',
      },
    ],
  },
  {
    id: 'g7',
    domain: 'gov',
    question:
      'A junior admin should be able to restart virtual machines but not delete them. Which feature grants that level of access?',
    options: [
      {
        text: 'Azure role-based access control (RBAC)',
        correct: true,
        why: 'RBAC assigns roles with specific permissions at a chosen scope.',
      },
      {
        text: 'Azure Policy',
        correct: false,
        why: 'Policy governs resource configuration, not what individual users may do.',
      },
      {
        text: 'Resource tags',
        correct: false,
        why: 'Tags only label resources.',
      },
      {
        text: 'Azure Advisor',
        correct: false,
        why: 'Advisor offers recommendations and does not assign permissions.',
      },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;
