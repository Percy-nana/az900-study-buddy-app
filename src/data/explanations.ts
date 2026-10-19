export type DomainCode = 'cloud' | 'arch' | 'gov';

export const DOMAIN_LABELS: Record<DomainCode, string> = {
  cloud: 'Cloud Concepts',
  arch: 'Azure Architecture & Services',
  gov: 'Management & Governance',
};

export const ALL_DOMAINS: DomainCode[] = ['cloud', 'arch', 'gov'];

export interface ExplanationText {
  analogy: string;
  breaks: string;
  definition: string;
  tip: string;
}

export interface Topic extends ExplanationText {
  id: string;
  topic: string;
  domain: DomainCode;
  keywords: string[];
  translations?: Partial<Record<'isiZulu' | 'Kiswahili' | 'Afrikaans' | 'Français', ExplanationText>>;
}

export type Language = 'English' | 'isiZulu' | 'Kiswahili' | 'Afrikaans' | 'Français';

export const LANGUAGES: Language[] = ['English', 'isiZulu', 'Kiswahili', 'Afrikaans', 'Français'];

export type StudyStyle =
  | 'Simple African analogy'
  | 'Technical summary'
  | 'Exam tips and common mix-ups'
  | "Explain like I'm new to cloud";

export const STUDY_STYLES: StudyStyle[] = [
  'Simple African analogy',
  'Technical summary',
  'Exam tips and common mix-ups',
  "Explain like I'm new to cloud",
];

export const META_NOTE_EN =
  'Study notes written for this unofficial tool. Always confirm details on Microsoft Learn.';
export const TRANSLATION_NOTE_EN =
  'Translation is a draft and may contain errors.';
export const MISSING_LANG_NOTE_EN =
  "This topic isn't available in that language yet. Showing English.";

export const EXPLANATIONS: Topic[] = [
  {
    id: 'shared-responsibility',
    topic: 'Shared responsibility model',
    domain: 'cloud',
    keywords: ['shared responsibility', 'security responsibility', 'customer responsibility'],
    analogy:
      'Think of renting a flat in a block. The landlord looks after the building, the roof and the gate security, but you still lock your own door and look after your belongings.',
    breaks:
      'In a flat the split is fixed, but in the cloud it changes with the service type: you carry more with virtual machines and less with SaaS.',
    definition:
      'The shared responsibility model divides security and operational tasks between the cloud provider and the customer. The customer always keeps responsibility for their information and data, devices, and accounts and identities, and the provider always owns the physical datacenter, network and hosts.',
    tip: 'Everything in between (operating system, network controls, applications) depends on whether you use IaaS, PaaS or SaaS. Data and identities are never handed over to the provider.',
  },
  {
    id: 'iaas-paas-saas',
    topic: 'IaaS, PaaS and SaaS',
    domain: 'cloud',
    keywords: ['iaas', 'paas', 'saas', 'service models', 'infrastructure as a service'],
    analogy:
      'Think about getting a meal. IaaS is renting an empty kitchen and cooking yourself. PaaS is a kitchen with the equipment ready, so you only bring the recipe. SaaS is ordering a finished meal at a restaurant.',
    breaks:
      'In the cloud you still pay as you go, and with IaaS and PaaS you stay responsible for whatever you deploy, which a restaurant diner never is.',
    definition:
      'IaaS provides virtualised infrastructure such as Azure Virtual Machines, and you manage the operating system and everything above it. PaaS provides a managed platform such as Azure App Service, so you manage only your application and data. SaaS is finished software such as Microsoft 365, managed by the provider.',
    tip: 'More control means more customer responsibility: IaaS has the most, SaaS has the least.',
  },
  {
    id: 'cloud-models',
    topic: 'Public, private and hybrid cloud',
    domain: 'cloud',
    keywords: ['public cloud', 'private cloud', 'hybrid cloud', 'cloud deployment models'],
    analogy:
      'Public cloud is like a minibus taxi: shared transport run by someone else, and you pay per ride. A private cloud is your own company car. Hybrid is using your own car for sensitive trips and taxis for the busy days.',
    breaks:
      'A private cloud is not just one server in a cupboard. It still offers self-service and pooled resources, but for a single organisation.',
    definition:
      'A public cloud is owned by a provider and shared by many customers. A private cloud is used exclusively by one organisation. A hybrid cloud combines public and private (or on-premises) environments with connectivity between them.',
    tip: 'Keeping sensitive data on-premises while moving seasonal workloads to Azure is the classic hybrid scenario.',
  },
  {
    id: 'elasticity-scalability',
    topic: 'Elasticity and scalability',
    domain: 'cloud',
    keywords: ['elasticity', 'scalability', 'autoscale', 'scale up', 'scale out'],
    analogy:
      'A taxi rank sends out extra taxis automatically when the rush-hour queue grows and sends them home when it clears. That is elasticity. Simply being able to add more taxis when needed is scalability.',
    breaks:
      'In Azure, elasticity needs rules or automation such as autoscale. It does not happen by itself for every service.',
    definition:
      'Scalability is the ability to increase or decrease resources to meet demand, either vertically (changing the size) or horizontally (changing the number of instances). Elasticity is doing this automatically as demand changes.',
    tip: 'If the scenario says the change happens automatically with demand, the answer is elasticity. If it only says the system can grow, it is scalability.',
  },
  {
    id: 'capex-opex',
    topic: 'CapEx vs OpEx',
    domain: 'cloud',
    keywords: ['capex', 'opex', 'capital expenditure', 'operational expenditure'],
    analogy:
      'Buying a car means a large upfront cost and you own it. Using e-hailing means you pay for each trip you take.',
    breaks: 'Cloud costs can still climb if you leave resources running, so pay-as-you-go still needs watching.',
    definition:
      'Capital expenditure (CapEx) is upfront spending on physical assets such as servers. Operational expenditure (OpEx) is spending on services as you use them. Moving to the cloud shifts spending from CapEx to OpEx.',
    tip: 'Buying servers and datacenters is CapEx. Paying for cloud services as you consume them is OpEx.',
  },
  {
    id: 'consumption-pricing',
    topic: 'Consumption-based pricing',
    domain: 'cloud',
    keywords: ['consumption', 'pay as you go', 'pricing model'],
    analogy:
      'Prepaid electricity works this way: you buy what you need and pay for what you use, with no fixed monthly contract.',
    breaks:
      'Azure also offers reservations, where you commit to a term in exchange for a discount, which is not pure pay-per-use.',
    definition:
      'With the consumption-based model you pay only for the resources you use, with no upfront cost.',
    tip: 'Pay only for what you use is consumption-based. Committing to a one-year or three-year term for a discount is a reservation.',
  },
  {
    id: 'high-availability',
    topic: 'High availability',
    domain: 'cloud',
    keywords: ['high availability', 'sla', 'uptime', 'fault tolerance', 'reliability'],
    analogy:
      'A shop with a generator and an inverter keeps trading through load-shedding. High availability is designing so that the service keeps running when part of it fails.',
    breaks:
      'A generator only covers power. Real high availability also covers servers, networks and data copies, and it costs more.',
    definition:
      'High availability means a workload stays accessible with minimal downtime, usually by removing single points of failure, for example by spreading it across availability zones. Availability is expressed in a service level agreement (SLA) percentage such as 99.99%.',
    tip: 'A higher SLA percentage means less permitted downtime.',
  },
  {
    id: 'serverless',
    topic: 'Serverless computing',
    domain: 'cloud',
    keywords: ['serverless', 'event driven', 'no servers'],
    analogy:
      'Using a ride-hailing app instead of owning a car: you only think about the trip, not the vehicle or the mechanic.',
    breaks: 'There are still servers. You simply do not manage them.',
    definition:
      'Serverless computing, such as Azure Functions, runs your code on demand while the platform handles servers, scaling and patching, and you pay for what runs.',
    tip: 'Event-driven code with no server management points to serverless. If you manage the operating system, it is a virtual machine.',
  },
  {
    id: 'regions-pairs',
    topic: 'Azure regions and region pairs',
    domain: 'arch',
    keywords: ['region', 'regions', 'region pair', 'geography', 'disaster recovery'],
    analogy:
      'A bank with branches in Johannesburg and Cape Town: if one city has a major disaster, the other can keep serving customers.',
    breaks:
      'Branches do not mirror each other automatically. In Azure, replication to the paired region has to be configured for each service.',
    definition:
      'An Azure region is a set of datacenters connected by a low-latency network within a geographic area. Most regions are paired with another region in the same geography to support disaster recovery, for example South Africa North and South Africa West.',
    tip: 'Region pairs protect against a whole-region disaster. Availability zones protect against a single datacenter failure.',
  },
  {
    id: 'availability-zones',
    topic: 'Availability zones',
    domain: 'arch',
    keywords: ['availability zone', 'availability zones', 'zones', 'zone redundancy'],
    analogy:
      'Imagine a spaza shop owner who keeps stock in three separate storerooms in different suburbs. If one has a power cut, the other two can still serve customers.',
    breaks:
      'Azure zones are linked by a fast private network, unlike storerooms that need a delivery run between them.',
    definition:
      'Availability zones are physically separate datacenter locations within an Azure region, each with independent power, cooling and networking. Regions that support zones have at least three.',
    tip: 'Zones protect against a datacenter failure. Region pairs protect against a whole-region disaster.',
    translations: {
      Kiswahili: {
        analogy:
          'Mfanyabiashara wa duka la mtaani anaweka bidhaa katika bohari tatu tofauti katika sehemu tofauti za mji. Umeme ukikatika kwenye bohari moja, mbili nyingine bado zinahudumia wateja.',
        breaks:
          'Zones za Azure zimeunganishwa kwa mtandao wa kasi ya juu, tofauti na bohari ambazo zinahitaji safari ya kusafirisha mizigo.',
        definition:
          'Availability zones ni maeneo ya vituo vya data yaliyotenganishwa kimwili ndani ya region moja ya Azure, kila moja ikiwa na umeme, upoozaji na mtandao wake. Region zinazounga mkono zones zina angalau tatu.',
        tip: 'Zones hulinda dhidi ya hitilafu ya kituo kimoja cha data; region pairs hulinda dhidi ya maafa ya region nzima.',
      },
      isiZulu: {
        analogy:
          'Cabanga umnikazi wesitolo se-spaza egcina impahla ezindlini zokugcina ezintathu ezindaweni ezahlukene. Uma ugesi uphela kwesisodwa, ezimbili ezisele ziyaqhubeka nokukhonza amakhasimende.',
        breaks:
          'Ama-zone e-Azure axhunywe ngenethiwekhi esheshayo, ngokungafani nezindlu zokugcina ezidinga uhambo lokulanda impahla.',
        definition:
          'Ama-availability zone yizindawo zedathasenta ezihlukaniswe ngokomzimba ngaphakathi kwe-region ye-Azure eyodwa, ngayinye inogesi, ukupholisa nenethiwekhi yayo. Ama-region asekela ama-zone anawo okungenani amathathu.',
        tip: 'Ama-zone avikela ekwehlulekeni kwedathasenta eyodwa; ama-region pair avikela enhlekeleni ye-region lonke.',
      },
    },
  },
  {
    id: 'resource-groups',
    topic: 'Resource groups',
    domain: 'arch',
    keywords: ['resource group', 'resource groups', 'container', 'rg'],
    analogy:
      'A resource group is like one folder for a household budget: rent, electricity and groceries all live together, so you can review them or close them as one.',
    breaks: 'A resource group is not a billing account. Billing is tracked at subscription level.',
    definition:
      'A resource group is a logical container for related Azure resources, used to deploy, manage and delete them together as a unit.',
    tip: 'A resource group sits inside a subscription. Management groups sit above subscriptions.',
    translations: {
      Kiswahili: {
        analogy:
          'Fikiria faili moja ya bajeti ya nyumbani: kodi, umeme na chakula vyote vinakaa pamoja ili uvikague au uvifunge kwa pamoja.',
        breaks: 'Resource group si akaunti ya malipo; malipo hufuatiliwa katika ngazi ya subscription.',
        definition:
          'Resource group ni kontena la kimantiki la rasilimali za Azure zinazohusiana, linalotumika kuzipeleka, kuzisimamia na kuzifuta pamoja.',
        tip: 'Resource group iko ndani ya subscription; management group ziko juu ya subscription.',
      },
      isiZulu: {
        analogy:
          'Cabanga ngefolda eyodwa yesabelomali sasekhaya: irenti, ugesi nokudla konke kugcinwa ndawonye ukuze ukubuyekeze noma uvale konge ngesikhathi esisodwa.',
        breaks: 'I-resource group akusona isikhwama sokukhokha; ukukhokha kulandelelwa ezingeni le-subscription.',
        definition:
          'I-resource group iyisiqukathi sezinsiza ze-Azure ezihlobene, esisetshenziselwa ukuzisebenzisa, ukuzilawula nokuzisusa ndawonye.',
        tip: 'I-resource group ihlala ngaphakathi kwe-subscription; ama-management group aphezu kwama-subscription.',
      },
    },
  },
  {
    id: 'subscriptions-management-groups',
    topic: 'Subscriptions and management groups',
    domain: 'arch',
    keywords: ['subscription', 'subscriptions', 'management group', 'management groups', 'hierarchy'],
    analogy:
      'Picture a company with several branches. Each branch has its own budget and manager (a subscription), head office sets rules across branches (a management group), and each branch keeps a folder per project (resource groups).',
    breaks:
      'At a real company, head office rules can be loosely followed. In Azure, policy and access assigned at a higher level are inherited by everything beneath it.',
    definition:
      'A subscription is a unit of management, billing and scale that holds resource groups. Management groups organise multiple subscriptions so you can apply policy and access control across all of them at once.',
    tip: 'The order from top to bottom is: management groups, subscriptions, resource groups, resources.',
  },
  {
    id: 'blob-storage',
    topic: 'Azure Blob Storage',
    domain: 'arch',
    keywords: ['blob', 'blob storage', 'object storage', 'unstructured data', 'storage account'],
    analogy:
      'Think of a big warehouse in Joburg where you drop off boxes of all shapes (photos, videos, backups) and get a shelf number back. You do not care how the shelves are built.',
    breaks:
      'A warehouse has no built-in copies, but Blob Storage can replicate your data across locations automatically.',
    definition:
      "Azure Blob Storage is Azure's object storage for large amounts of unstructured data such as images, video, documents and backups.",
    tip: 'Do not confuse it with Azure Files (managed file shares), Queue Storage (messages) or Table Storage (structured NoSQL data).',
    translations: {
      Kiswahili: {
        analogy:
          'Fikiria ghala kubwa ambapo unaleta masanduku ya kila aina (picha, video, nakala rudufu) na kupewa nambari ya rafu. Huhitaji kujua rafu zimejengwa vipi.',
        breaks:
          'Ghala la kawaida halina nakala za ziada; Blob Storage inaweza kunakili data yako kwenye maeneo mbalimbali kiotomatiki.',
        definition:
          'Azure Blob Storage ni hifadhi ya vitu (object storage) ya Azure kwa kiasi kikubwa cha data isiyo na muundo kama picha, video na nakala rudufu.',
        tip: 'Usichanganye na Azure Files (hisa za faili) au Queue Storage (ujumbe).',
      },
      isiZulu: {
        analogy:
          'Cabanga indlu yokugcina enkulu lapho ushiya amabhokisi anhlobonhlobo (izithombe, amavidiyo, amakhophi okugcina) bese uthola inombolo yeshalofu. Awudingi ukwazi ukuthi amashalofu akhiwe kanjani.',
        breaks:
          'Indlu yokugcina evamile ayinawo amakhophi engeziwe; i-Blob Storage ingakopisha idatha yakho ezindaweni eziningi ngokuzenzakalelayo.',
        definition:
          'I-Azure Blob Storage iyindawo ye-Azure yokugcina izinto (object storage) zedatha eningi engahlelekile njengezithombe, amavidiyo namakhophi okugcina.',
        tip: 'Ungayididanisi ne-Azure Files (okwabelwana ngamafayela) noma i-Queue Storage (imilayezo).',
      },
    },
  },
  {
    id: 'storage-redundancy',
    topic: 'Storage redundancy (LRS, ZRS, GRS)',
    domain: 'arch',
    keywords: ['lrs', 'zrs', 'grs', 'redundancy', 'replication', 'gzrs'],
    analogy:
      'Think of keeping copies of an important document: three copies in one cabinet (LRS), copies in three different buildings across town (ZRS), or one set here and another copied to a different city (GRS).',
    breaks:
      'Azure keeps the copies in sync for you. With geo-redundant storage the copy in the second region is only readable if you choose a read-access option.',
    definition:
      'Locally redundant storage (LRS) keeps three copies in a single datacenter. Zone-redundant storage (ZRS) spreads copies across three availability zones in one region. Geo-redundant storage (GRS) also replicates to a secondary region.',
    tip: 'To survive a datacenter failure, think ZRS. To survive a whole-region disaster, think GRS or GZRS.',
  },
  {
    id: 'virtual-machines',
    topic: 'Azure Virtual Machines',
    domain: 'arch',
    keywords: ['virtual machine', 'virtual machines', 'vm', 'vms', 'compute'],
    analogy:
      'Renting a whole stand at a flea market: you get the space, but you set it up, decorate it and secure it yourself.',
    breaks:
      'Unlike a stand, you can resize or stop a VM in minutes. Compute billing stops when it is deallocated, but the disks still cost money.',
    definition:
      'Azure Virtual Machines provide IaaS compute. You choose the operating system and size, and you are responsible for patching and managing the operating system and software.',
    tip: 'If you need full control of the operating system, or are lifting and shifting, pick a virtual machine. If you do not want to manage the OS, look at App Service or Functions.',
  },
  {
    id: 'azure-functions',
    topic: 'Azure Functions',
    domain: 'arch',
    keywords: ['functions', 'azure functions', 'serverless', 'trigger', 'event driven'],
    analogy:
      'A security gate that only wakes the guard when someone presses the buzzer. No visitors, no work, no cost.',
    breaks: 'Triggers are not just buzzers. They can be web requests, timers or queue messages.',
    definition:
      'Azure Functions is event-driven, serverless compute. Small pieces of code run when a trigger fires, and you do not manage servers.',
    tip: 'Run code only when an event happens, without managing servers, points to Azure Functions.',
  },
  {
    id: 'vpn-expressroute',
    topic: 'VPN Gateway vs ExpressRoute',
    domain: 'arch',
    keywords: ['vpn', 'vpn gateway', 'expressroute', 'private connection', 'connectivity'],
    analogy:
      'A VPN is like sending valuables in an armoured van along a public road. ExpressRoute is like having a private road that only you use.',
    breaks:
      'Both are secure. The difference is the path, not that a VPN is insecure: it is encrypted but shares the public internet.',
    definition:
      'VPN Gateway sends encrypted traffic over the public internet between your network and Azure. ExpressRoute is a private, dedicated connection through a connectivity provider and does not travel over the public internet.',
    tip: 'A private connection that does not go over the public internet means ExpressRoute. An encrypted tunnel over the internet means VPN Gateway.',
  },
  {
    id: 'entra-id',
    topic: 'Microsoft Entra ID',
    domain: 'arch',
    keywords: ['entra', 'entra id', 'azure active directory', 'azure ad', 'identity', 'sso', 'mfa'],
    analogy:
      "Think of the ID check at a mall's security desk: it confirms who you are, and then your access card decides which doors open for you.",
    breaks:
      'Entra ID handles identity and sign-in. What you may manage in Azure is decided with role-based access control (RBAC).',
    definition:
      "Microsoft Entra ID (formerly Azure Active Directory) is Microsoft's cloud-based identity and access management service, offering single sign-on, multifactor authentication and Conditional Access.",
    tip: 'Authentication (who you are) is Entra ID. Authorization on Azure resources (what you can do) is RBAC.',
  },
  {
    id: 'virtual-network',
    topic: 'Azure Virtual Network',
    domain: 'arch',
    keywords: ['virtual network', 'vnet', 'subnet', 'network security group', 'nsg', 'peering'],
    analogy:
      'A virtual network is like your own gated estate with internal roads. The subnets are the streets inside, and the gates control what comes in and out.',
    breaks:
      'Resources inside a virtual network can talk to each other by default, so you add network security groups to restrict traffic.',
    definition:
      'An Azure Virtual Network is a private network in Azure where resources communicate securely with each other, the internet and on-premises networks. It is divided into subnets.',
    tip: 'Network security groups filter traffic. VNet peering connects two virtual networks.',
  },
  {
    id: 'azure-policy',
    topic: 'Azure Policy',
    domain: 'gov',
    keywords: ['policy', 'azure policy', 'compliance', 'governance', 'initiative'],
    analogy:
      'Think of the rules of a housing estate: no loud music after 10 pm, and the estate manager flags or blocks anything that breaks the rules.',
    breaks:
      'Policy checks resources and can deny or modify them. It does not decide who is allowed to act, which is the job of RBAC.',
    definition:
      'Azure Policy creates, assigns and manages rules that enforce standards and assess compliance across your Azure resources, for example allowing resources only in approved regions.',
    tip: 'Policy controls what is allowed on resources. RBAC controls what users can do.',
  },
  {
    id: 'rbac',
    topic: 'Azure role-based access control (RBAC)',
    domain: 'gov',
    keywords: ['rbac', 'role based access control', 'roles', 'owner', 'contributor', 'reader', 'access'],
    analogy:
      'Access cards at an office: reception staff can open the front door, while the IT team can also open the server room.',
    breaks:
      'RBAC permissions are given at a scope and inherited downwards, which a plain access card does not capture.',
    definition:
      'Azure role-based access control grants users, groups and applications specific roles, such as Reader, Contributor or Owner, at a chosen scope.',
    tip: 'Permissions assigned at a management group, subscription or resource group flow down to everything beneath it.',
  },
  {
    id: 'resource-locks',
    topic: 'Resource locks',
    domain: 'gov',
    keywords: ['lock', 'locks', 'resource lock', 'cannotdelete', 'readonly', 'delete protection'],
    analogy:
      'A padlock on the safe: even staff with keys to the office cannot open it until the lock is taken off.',
    breaks:
      'A lock is not protection against attackers. It guards against accidental changes by authorised people, and someone with the right permission can remove it.',
    definition:
      'Resource locks prevent accidental deletion (CanNotDelete) or modification (ReadOnly) of Azure resources, whatever the user\u2019s role permissions are.',
    tip: 'Locks apply to everyone and are inherited by child resources. Remove the lock before you delete.',
  },
  {
    id: 'tags',
    topic: 'Resource tags',
    domain: 'gov',
    keywords: ['tag', 'tags', 'tagging', 'cost tracking', 'labels'],
    analogy:
      "Sticky labels on moving boxes: 'Kitchen', 'Fragile', 'Owner: Thandi'. They help you find and sort things.",
    breaks:
      'Tags are labels, not rules. In Azure, resources do not inherit tags from their resource group by default.',
    definition:
      'Tags are name-value pairs added to resources, resource groups and subscriptions to organise them, track costs and show ownership.',
    tip: 'Tags organise and report. They do not block any action.',
  },
  {
    id: 'azure-advisor',
    topic: 'Azure Advisor',
    domain: 'gov',
    keywords: ['advisor', 'azure advisor', 'recommendations', 'best practices'],
    analogy:
      'A friendly consultant walks through your shop and tells you: the lights are on all night (cost) and you have no backup plan (reliability).',
    breaks: 'Advisor only recommends. You have to apply the changes yourself.',
    definition:
      'Azure Advisor analyses your deployed resources and recommends improvements across reliability, security, performance, cost and operational excellence.',
    tip: 'Advisor suggests, Policy enforces.',
  },
  {
    id: 'azure-monitor',
    topic: 'Azure Monitor',
    domain: 'gov',
    keywords: ['monitor', 'azure monitor', 'metrics', 'logs', 'alerts', 'telemetry', 'service health'],
    analogy:
      'Think of the dashboard of a delivery van: speed, fuel level and warning lights, plus a beep when something is wrong.',
    breaks:
      'Monitor collects data and raises alerts. Fixing the problem is separate, although alerts can trigger actions.',
    definition:
      'Azure Monitor collects, analyses and acts on telemetry such as metrics and logs from your Azure and on-premises resources, including alerting.',
    tip: 'Monitor is telemetry from your own resources, Service Health reports Azure platform incidents, and Advisor gives recommendations.',
  },
  {
    id: 'azure-arc',
    topic: 'Azure Arc',
    domain: 'gov',
    keywords: ['arc', 'azure arc', 'hybrid management', 'multicloud', 'on-premises'],
    analogy:
      'A franchise head office that manages branches in different towns using the same tools, even though the branches are not in head office.',
    breaks: 'Arc does not move the branch\u2019s workload into Azure. The resources stay where they are.',
    definition:
      'Azure Arc extends Azure management and services to resources outside Azure, such as on-premises servers, other clouds and edge locations, by projecting them into Azure.',
    tip: 'Managing resources in place is Azure Arc. Moving workloads into Azure is Azure Migrate.',
  },
  {
    id: 'pricing-tco',
    topic: 'Pricing calculator vs TCO calculator',
    domain: 'gov',
    keywords: ['pricing calculator', 'tco', 'total cost of ownership', 'cost management', 'estimate cost'],
    analogy:
      'The pricing calculator is the quote for fitting out a new shop. The TCO calculator compares the cost of staying in your old premises with moving to the new one.',
    breaks:
      'Both give estimates. Your actual bill depends on usage and region, and Cost Management shows what you really spent.',
    definition:
      'The pricing calculator estimates the cost of the Azure services you plan to use. The Total Cost of Ownership (TCO) calculator estimates savings by comparing on-premises costs with running the same workloads in Azure.',
    tip: 'Estimating Azure cost is the pricing calculator. Comparing on-premises with Azure is TCO. Analysing real spend is Microsoft Cost Management.',
  },
];
