// Gramin Pragati - Application Logic (Translation, Quiz, Search, & Accessibility)
// Custom-built for Madanapalle, Andhra Pradesh Rural Digital Empowerment Student Process

// --- MOCK DATABASE OF KIOSKS / WI-FI CHAUPALS (MADANAPALLE & AP FOCUS) ---
const KIOSKS_DATABASE = [
    {
        name: "Angallu Village Sachivalayam Kiosk",
        nameHindi: "अंगल्लू ग्राम सचिवालय किओस्क",
        nameTelugu: "అంగళ్లు గ్రామ సచివాలయం కియోస్క్",
        type: "AP FiberNet & CSC Centre",
        typeHindi: "एपी फाइबरनेट और सीएससी केंद्र",
        typeTelugu: "ఏపీ ఫైబర్ నెట్ & సీఎస్సీ సెంటర్",
        village: "Angallu",
        villageHindi: "अंगल्लू",
        villageTelugu: "అంగళ్లు",
        district: "Annamayya (Chittoor)",
        districtHindi: "अन्नमय्या (चित्तूर)",
        districtTelugu: "అన్నమయ్య (చిత్తూర్)",
        state: "Andhra Pradesh",
        stateHindi: "आंध्र प्रदेश",
        stateTelugu: "ఆంధ్రప్రదేశ్",
        operator: "K. Srinivasulu",
        operatorHindi: "के. श्रीनिवासुलु",
        operatorTelugu: "కె. శ్రీనివాసులు",
        phone: "+91 98480 22334",
        status: "online",
        amenities: ["Free AP FiberNet Wi-Fi", "Aadhaar Registration", "Panchayat Services", "Print & Scan"],
        amenitiesHindi: ["मुफ्त एपी फाइबरनेट वाई-फाई", "आधार पंजीकरण", "पंचायत सेवाएं", "प्रिंट और स्कैन"],
        amenitiesTelugu: ["ఉచిత ఏపీ ఫైబర్ నెట్ వై-ఫై", "ఆధార్ నమోదు", "పంచాయతీ సేవలు", "ప్రింట్ & స్కాన్"]
    },
    {
        name: "Kurabalakota Digital Seva Kendra",
        nameHindi: "कुरबलाकोटा डिजिटल सेवा केंद्र",
        nameTelugu: "కురబలకోట డిజిటల్ సేవా కేంద్రం",
        type: "Common Service Centre",
        typeHindi: "सामान्य सेवा केंद्र",
        typeTelugu: "కామన్ సర్వీస్ సెంటర్",
        village: "Kurabalakota",
        villageHindi: "कुरबलाकोटा",
        villageTelugu: "కురబలకోట",
        district: "Annamayya (Chittoor)",
        districtHindi: "अन्नमय्या (चित्तूर)",
        districtTelugu: "అన్నమయ్య (చిత్తూర్)",
        state: "Andhra Pradesh",
        stateHindi: "आंध्र प्रदेश",
        stateTelugu: "ఆంధ్రప్రదేశ్",
        operator: "M. Lakshmi Devi",
        operatorHindi: "एम. लक्ष्मी देवी",
        operatorTelugu: "యం. లక్ష్మీ దేవి",
        phone: "+91 94405 67890",
        status: "online",
        amenities: ["Free Wi-Fi", "Electricity Bills", "Agriculture Portal Access"],
        amenitiesHindi: ["मुफ्त वाई-फाई", "बिजली बिल भुगतान", "कृषि पोर्टल पहुंच"],
        amenitiesTelugu: ["ఉచిత వై-ఫై", "విద్యుత్ బిల్లుల చెల్లింపు", "వ్యవసాయ పోర్టల్ సహాయం"]
    },
    {
        name: "Nimmanapalle BharatNet Hotspot",
        nameHindi: "निम्मनपल्ले भारतनेट हॉटस्पॉट",
        nameTelugu: "निమ్మనపల్లె భారత్‌నెట్ హాట్‌స్పాట్",
        type: "Public Wi-Fi Kiosk",
        typeHindi: "सार्वजनिक वाई-फाई किओस्क",
        typeTelugu: "పబ్లిక్ వై-ఫై హాట్‌స్పాట్",
        village: "Nimmanapalle",
        villageHindi: "निम्मनपल्ले",
        villageTelugu: "నిమ్మనపల్లె",
        district: "Annamayya (Chittoor)",
        districtHindi: "अन्नमय्या (चित्तूर)",
        districtTelugu: "అన్నమయ్య (చిత్తూర్)",
        state: "Andhra Pradesh",
        stateHindi: "आंध्र प्रदेश",
        stateTelugu: "ఆంధ్రప్రదేశ్",
        operator: "P. Venkat Rao",
        operatorHindi: "पी. वेंकट राव",
        operatorTelugu: "పి. వెంకటరావు",
        phone: "+91 89785 12345",
        status: "online",
        amenities: ["Free Wi-Fi Broadband", "Mobile Recharge", "Online Banking Support"],
        amenitiesHindi: ["मुफ्त वाई-फाई ब्रॉडबैंड", "मोबाइल रिचार्ज", "ऑनलाइन बैंकिंग सहायता"],
        amenitiesTelugu: ["ఉచిత బ్రాడ్‌బ్యాండ్ వై-ఫై", "మొబైల్ రీఛార్జ్", "ఆన్‌లైన్ బ్యాంకింగ్ సేవలు"]
    },
    {
        name: "Horsley Hills Community Wi-Fi",
        nameHindi: "हॉर्सली हिल्स कम्युनिटी वाई-फाई",
        nameTelugu: "హార్సిలీ హిల్స్ కమ్యూనిటీ వై-ఫై",
        type: "Public Wi-Fi Hotspot",
        typeHindi: "सार्वजनिक वाई-फाई हॉटस्पॉट",
        typeTelugu: "పబ్లిక్ వై-ఫై హాట్‌స్పాట్",
        village: "Horsley Hills",
        villageHindi: "हॉर्सली हिल्स",
        villageTelugu: "హార్సిలీ హిల్స్",
        district: "Annamayya (Chittoor)",
        districtHindi: "अन्नमय्या (चित्तूर)",
        districtTelugu: "అన్నమయ్య (చిత్తూర్)",
        state: "Andhra Pradesh",
        stateHindi: "आंध्र प्रदेश",
        stateTelugu: "ఆంధ్రప్రదేశ్",
        operator: "G. Rammohan Reddy",
        operatorHindi: "जी. राममोहन रेड्डी",
        operatorTelugu: "జి. రామ్మోహన్ రెడ్డి",
        phone: "+91 73822 55667",
        status: "online",
        amenities: ["High-speed Internet", "Tourist Digital Assistance", "Emergency Services Access"],
        amenitiesHindi: ["हाई-स्पीड इंटरनेट", "पर्यटक डिजिटल सहायता", "आपातकालीन सेवा पहुंच"],
        amenitiesTelugu: ["హై-స్పీడ్ ఇంటర్నెట్", "పర్యాటక డిజిటల్ సహాయం", "అత్యవసర సేవల యాక్సెస్"]
    },
    {
        name: "B. Kothakota Digital Seva Kendra",
        nameHindi: "बी. कोथाकोटा डिजिटल सेवा केंद्र",
        nameTelugu: "బి. కొత్తకోట డిజిటల్ సేవా కేంద్రం",
        type: "Common Service Centre Hub",
        typeHindi: "सामान्य सेवा केंद्र हब",
        typeTelugu: "కామన్ సర్వీస్ సెంటర్ హబ్",
        village: "B. Kothakota",
        villageHindi: "बी. कोथाकोटा",
        villageTelugu: "బి. కొత్తకోట",
        district: "Annamayya (Chittoor)",
        districtHindi: "अन्नमय्या (चित्तूर)",
        districtTelugu: "అన్నమయ్య (చిత్తూర్)",
        state: "Andhra Pradesh",
        stateHindi: "आंध्र प्रदेश",
        stateTelugu: "ఆంధ్రప్రదేశ్",
        operator: "Y. Rajesh Kumar",
        operatorHindi: "वाई. राजेश कुमार",
        operatorTelugu: "వై. రాజేష్ కుమార్",
        phone: "+91 99086 44321",
        status: "online",
        amenities: ["Aadhaar & PAN Services", "Digital Land Records (Meebhoomi)", "E-Education Support"],
        amenitiesHindi: ["आधार और पैन सेवाएं", "डिजिटल भूमि रिकॉर्ड (मीभूमि)", "ई-शिक्षा सहायता"],
        amenitiesTelugu: ["ఆధార్ & పాన్ సేవలు", "డిజిటల్ భూమి రికార్డులు (మీభూమి)", "ఈ-ఎడ్యుకేషన్ సాయం"]
    }
];

// --- TRANSLATION MAP (ENGLISH, HINDI & TELUGU) ---
let currentLanguage = 'en'; // default

const TRANSLATIONS = {
    en: {
        brandLogo: 'Gramin <span>Pragati</span>',
        navHome: 'Home',
        navLocator: 'Internet Locator',
        navLiteracy: 'Literacy Hub',
        navServices: 'Services',
        navEmpower: 'Get Connected',
        langBtnText: 'English',
        heroBadgeText: 'Digital India Initiative',
        heroTitle: 'Empowering Rural India through <span>Digital Progress</span>',
        heroDesc: 'Connecting villages to the world. Gramin Pragati brings high-speed internet kiosk locator tools, self-paced digital literacy modules, and simple access to central government utilities directly to your village.',
        ctaFind: 'Find Internet Kiosk',
        ctaLearn: 'Start Learning',
        statPanchayats: 'Panchayats',
        statLiterate: 'Digitally Literate',
        statConnected: 'Connected',
        locatorTitle: 'Internet Access & Kiosk Locator',
        locatorSubtitle: 'Find your nearest Common Service Centre (CSC), Wi-Fi Chaupal, or public internet hotspot in seconds.',
        locatorSearchPlaceholder: 'Enter State, District or Village name...',
        literacyTitle: 'Digital Literacy Learning Hub',
        literacySubtitle: 'Master digital skills with simple interactive lessons and test your knowledge to earn a digital badge.',
        quizCardTitle: 'Digital Citizen Quiz',
        servicesTitle: 'Government e-Services Portal',
        servicesSubtitle: 'Quick link shortcuts to digital schemes and empowerment portals for villagers.',
        formBadgeText: 'Get Connected Today',
        formHeader: 'Bring Digital Services to Your Village',
        formSubheader: 'Don\'t have an active CSC or Wi-Fi hotspot in your Gram Panchayat? Submit a digital request, and our district digital team will review setup possibilities.',
        infoCallTitle: 'Call Helpline',
        infoEmailTitle: 'Email Support',
        formBoxTitle: 'Request a Village Connection',
        lblName: 'Your Full Name',
        lblPhone: 'Phone Number',
        lblState: 'State',
        lblDistrict: 'District',
        lblVillage: 'Village / Gram Panchayat Name',
        lblMsg: 'Additional Requirements (Optional)',
        btnSubmit: 'Submit Request',
        succTitle: 'Request Successfully Logged!',
        succDesc: 'Thank you for contacting us. Your digital request ID is <strong id="ticket-number">#GP-98214</strong>. A representative from the block office will reach out shortly.',
        succBtnBack: 'Go Back',
        accPanelTitle: 'Accessibility Panel',
        accLblText: 'Text Size',
        accLblContrast: 'Contrast Mode',
        footDesc: 'Empowering rural communities through digital literacy, connectivity, and open government services.',
        footHdrQuick: 'Quick Navigation',
        footHdrGov: 'Important Portals',
        footHdrContact: 'Contact',
        footDisclaimer: 'Website is designed for fast rendering over low-bandwidth rural networks.',
        
        // Kiosk Detail Labels
        kOperator: 'Operator',
        kPhone: 'Phone',
        kLocation: 'Location',
        kStatusOnline: 'Active / चालू / యాక్టివ్',
        
        // Tutorial Card titles and descriptions
        tutTitle1: 'Using the Internet',
        tutDesc1: 'Learn how to search information, open websites, and stay safe online.',
        tutLink1: 'Start Module',
        tutTitle2: 'Safe Mobile Banking',
        tutDesc2: 'Learn UPI payments, secure PIN setup, and how to spot online fraud.',
        tutLink2: 'Start Module',
        tutTitle3: 'Digital Agriculture',
        tutDesc3: 'Check crop prices, download land records, and view weather advisories online.',
        tutLink3: 'Start Module',
        tutTitle4: 'Online Education',
        tutDesc4: 'Explore free education portals like DIKSHA & SWAYAM for school children.',
        tutLink4: 'Start Module',
        
        // Government service card translations
        srvTitle1: 'PM-Kisan Samman Nidhi',
        srvDesc1: 'Check farmer benefit payment status, registration information, and local land records.',
        srvTitle2: 'AP Grama Sachivalayam',
        srvDesc2: 'Access hundreds of state services and welfare schemes directly in your village secretariat.',
        srvTitle3: 'AP FiberNet Portal',
        srvDesc3: 'Check village broadband status, connection availability, and digital television plans.',
        srvTitle4: 'DigiLocker',
        srvDesc4: 'Access authentic digital documents like Aadhaar, Driving License, and school marksheets.',
    },
    hi: {
        brandLogo: 'ग्रामीण <span>प्रगति</span>',
        navHome: 'मुख्य पृष्ठ',
        navLocator: 'इंटरनेट लोकेटर',
        navLiteracy: 'साक्षरता केंद्र',
        navServices: 'सेवाएं',
        navEmpower: 'कनेक्शन पाएं',
        langBtnText: 'हिन्दी',
        heroBadgeText: 'डिजिटल इंडिया पहल',
        heroTitle: 'डिजिटल विकास से <span>ग्रामीण भारत</span> का सशक्तिकरण',
        heroDesc: 'गांवों को दुनिया से जोड़ना। ग्रामीण प्रगति आपके गांव में हाई-स्पीड इंटरनेट किओस्क खोजने का टूल, स्व-गति से डिजिटल साक्षरता मॉड्यूल और सरकारी सुविधाओं की आसान पहुंच प्रदान करता है।',
        ctaFind: 'इंटरनेट किओस्क खोजें',
        ctaLearn: 'सीखना शुरू करें',
        statPanchayats: 'ग्राम पंचायतें',
        statLiterate: 'डिजिटल साक्षर',
        statConnected: 'जुड़े हुए',
        locatorTitle: 'इंटरनेट एक्सेस और किओस्क लोकेटर',
        locatorSubtitle: 'सेकंडों में अपना निकटतम सामान्य सेवा केंद्र (सीएससी), वाई-फाई चौपाल या सार्वजनिक इंटरनेट हॉटस्पॉट खोजें।',
        locatorSearchPlaceholder: 'राज्य, जिला या गांव का नाम दर्ज करें...',
        literacyTitle: 'डिजिटल साक्षरता शिक्षण केंद्र',
        literacySubtitle: 'सरल इंटरैक्टिव पाठों के साथ डिजिटल कौशल में महारत हासिल करें और डिजिटल बैज अर्जित करने के लिए अपने ज्ञान का परीक्षण करें।',
        quizCardTitle: 'डिजिटल नागरिक प्रश्नोत्तरी',
        servicesTitle: 'सरकारी ई-सेवाएं पोर्टल',
        servicesSubtitle: 'ग्रामीणों के लिए डिजिटल योजनाओं और सशक्तिकरण पोर्टलों के त्वरित लिंक शॉर्टकट।',
        formBadgeText: 'आज ही जुड़ें',
        formHeader: 'अपने गांव में डिजिटल सेवाएं लाएं',
        formSubheader: 'क्या आपकी ग्राम पंचायत में सक्रिय सीएससी या वाई-फाई हॉटस्पॉट नहीं है? एक डिजिटल अनुरोध सबमिट करें, और हमारी जिला टीम संभावनाओं की समीक्षा करेगी।',
        infoCallTitle: 'हेल्पलाइन पर कॉल करें',
        infoEmailTitle: 'ईमेल समर्थन',
        formBoxTitle: 'ग्राम कनेक्शन का अनुरोध करें',
        lblName: 'आपका पूरा नाम',
        lblPhone: 'फ़ोन नंबर',
        lblState: 'राज्य',
        lblDistrict: 'ज़िला',
        lblVillage: 'गांव / ग्राम पंचायत का नाम',
        lblMsg: 'अतिरिक्त आवश्यकताएं (वैकल्पिक)',
        btnSubmit: 'अनुरोध भेजें',
        succTitle: 'अनुरोध सफलतापूर्वक दर्ज किया गया!',
        succDesc: 'हमसे संपर्क करने के लिए धन्यवाद। आपका डिजिटल अनुरोध आईडी <strong id="ticket-number">#GP-98214</strong> है। ब्लॉक कार्यालय का एक प्रतिनिधि जल्द ही आपसे संपर्क करेगा।',
        succBtnBack: 'वापस जाएं',
        accPanelTitle: 'सुलभता (एक्सेसिबिलिटी) पैनल',
        accLblText: 'लिखावट का आकार',
        accLblContrast: 'कंट्रास्ट मोड',
        footDesc: 'डिजिटल साक्षरता, कनेक्टिविटी और खुली सरकारी सेवाओं के माध्यम से ग्रामीण समुदायों को सशक्त बनाना।',
        footHdrQuick: 'त्वरित नेविगेशन',
        footHdrGov: 'महत्वपूर्ण पोर्टल',
        footHdrContact: 'संपर्क',
        footDisclaimer: 'वेबसाइट को कम-बैंडविड्थ ग्रामीण नेटवर्क पर तेजी से लोड होने के लिए डिज़ाइन किया गया है।',
        
        // Kiosk Detail Labels
        kOperator: 'संचालक',
        kPhone: 'फ़ोन',
        kLocation: 'स्थान',
        kStatusOnline: 'चालू / Active / యాక్టివ్',
        
        // Tutorial Card titles and descriptions
        tutTitle1: 'इंटरनेट का उपयोग',
        tutDesc1: 'इंटरनेट पर जानकारी खोजना, वेबसाइट खोलना और ऑनलाइन सुरक्षित रहने के तरीके सीखें।',
        tutLink1: 'मॉड्यूल शुरू करें',
        tutTitle2: 'सुरक्षित मोबाइल बैंकिंग',
        tutDesc2: 'UPI भुगतान, सुरक्षित पिन सेट करना और ऑनलाइन धोखाधड़ी को पहचानना सीखें।',
        tutLink2: 'मॉड्यूल शुरू करें',
        tutTitle3: 'डिजिटल कृषि',
        tutDesc3: 'फसल की कीमतें जांचें, भूमि रिकॉर्ड डाउनलोड करें और ऑनलाइन मौसम की सलाह देखें।',
        tutLink3: 'मॉड्यूल शुरू करें',
        tutTitle4: 'ऑनलाइन शिक्षा',
        tutDesc4: 'स्कूली बच्चों के लिए दीक्षा (DIKSHA) और स्वयं (SWAYAM) जैसे मुफ्त शिक्षा पोर्टल देखें।',
        tutLink4: 'मॉड्यूल शुरू करें',
        
        // Government service card translations
        srvTitle1: 'पीएम-किसान सम्मान निधि',
        srvDesc1: 'किसान लाभ भुगतान स्थिति, पंजीकरण जानकारी और स्थानीय भूमि रिकॉर्ड की जांच करें।',
        srvTitle2: 'एपी ग्राम सचिवालय',
        srvDesc2: 'अपने ग्राम सचिवालय में सीधे सैकड़ों राज्य सेवाओं और कल्याणकारी योजनाओं का लाभ उठाएं।',
        srvTitle3: 'एपी फाइबरनेट पोर्टल',
        srvDesc3: 'ग्राम ब्रॉडबैंड स्थिति, कनेक्शन उपलब्धता और डिजिटल टेलीविजन योजनाओं की जांच करें।',
        srvTitle4: 'डिजिलॉकर',
        srvDesc4: 'आधार, ड्राइविंग लाइसेंस और स्कूल अंकपत्र जैसे प्रामाणिक डिजिटल दस्तावेजों तक पहुंचें।',
    },
    te: {
        brandLogo: 'గ్రామీణ <span>ప్రగతి</span>',
        navHome: 'హోమ్',
        navLocator: 'ఇంటర్నెట్ లొకేటర్',
        navLiteracy: 'డిజిటల్ సాక్షరత',
        navServices: 'సేవలు',
        navEmpower: 'కనెక్షన్ పొందండి',
        langBtnText: 'తెలుగు',
        heroBadgeText: 'డిజిటల్ ఇండియా చొరవ',
        heroTitle: 'డిజిటల్ అభివృద్ధితో <span>గ్రామీణ భారత్</span> సాధికారత',
        heroDesc: 'గ్రామాలను ప్రపంచంతో అనుసంధానించడం. గ్రామీణ ప్రగతి మీ గ్రామంలో హై-స్పీడ్ ఇంటర్నెట్ కియోస్క్ శోధన సాధనాలు, డిజిటల్ సాక్షరత పాఠాలు మరియు ప్రభుత్వ సేవలను సులభంగా పొందే వీలు కల్పిస్తుంది.',
        ctaFind: 'ఇంటర్నెట్ కియోస్క్ కనుగొనండి',
        ctaLearn: 'నేర్చుకోవడం ప్రారంభించండి',
        statPanchayats: 'పంచాయతీలు',
        statLiterate: 'డిజిటల్ సాక్షరులు',
        statConnected: 'కనెక్ట్ చేయబడింది',
        locatorTitle: 'ఇంటర్నెట్ మరియు కియోస్క్ లొకేటర్',
        locatorSubtitle: 'మీకు సమీపంలో ఉన్న కామన్ సర్వీస్ సెంటర్ (CSC), వై-ఫై చౌపాల్ లేదా పబ్లిక్ ఇంటర్నెట్ హాట్‌స్పాట్‌ను సెకన్లలో కనుగొనండి.',
        locatorSearchPlaceholder: 'రాష్ట్రం, జిల్లా లేదా గ్రామం పేరు నమోదు చేయండి...',
        literacyTitle: 'డిజిటల్ సాక్షరత లెర్నింగ్ హబ్',
        literacySubtitle: 'సరళమైన పాఠాలతో డిజిటల్ నైపుణ్యాలను నేర్చుకోండి మరియు డిజిటల్ సిటిజన్ బ్యాడ్జ్ పొందడానికి మీ జ్ఞానాన్ని పరీక్షించుకోండి.',
        quizCardTitle: 'డిజిటల్ సిటిజన్ క్విజ్',
        servicesTitle: 'ప్రభుత్వ ఈ-సేవల పోర్టల్',
        servicesSubtitle: 'గ్రామీణ ప్రజల కోసం డిజిటల్ పథకాలు మరియు సాధికారత పోర్టల్‌ల శీఘ్ర లింకులు.',
        formBadgeText: 'ఈరోజే కనెక్ట్ అవ్వండి',
        formHeader: 'మీ గ్రామానికి డిజిటల్ సేవలను తీసుకురండి',
        formSubheader: 'మీ గ్రామ పంచాయితీలో యాక్టివ్ సీఎస్సీ లేదా వై-ఫై హాట్‌స్పాట్ లేదా? డిజిటల్ అభ్యర్థనను సమర్పించండి మరియు మా జిల్లా డిజిటల్ బృందం పరిశీలిస్తుంది.',
        infoCallTitle: 'హెల్ప్‌లైన్‌కు కాల్ చేయండి',
        infoEmailTitle: 'ఇమెయిల్ సపోర్ట్',
        formBoxTitle: 'గ్రామ కనెక్షన్ కోసం అభ్యర్థించండి',
        lblName: 'మీ పూర్తి పేరు',
        lblPhone: 'ఫోన్ నంబర్',
        lblState: 'రాష్ట్రం',
        lblDistrict: 'జిల్లా',
        lblVillage: 'గ్రామం / గ్రామ పంచాయితీ పేరు',
        lblMsg: 'అదనపు అవసరాలు (ఐచ్ఛికం)',
        btnSubmit: 'అభ్యర్థన సమర్పించండి',
        succTitle: 'అభ్యర్థన విజయవంతంగా నమోదైంది!',
        succDesc: 'మమ్మల్ని సంప్రదించినందుకు ధన్యవాదాలు. మీ డిజిటల్ అభ్యర్థన ఐడి <strong id="ticket-number">#GP-98214</strong>. త్వరలోనే మా ప్రతినిధి మిమ్మల్ని సంప్రదిస్తారు.',
        succBtnBack: 'వెనుకకు వెళ్ళండి',
        accPanelTitle: 'యాక్సెసిబిలిటీ ప్యానెల్',
        accLblText: 'అక్షరాల పరిమాణం',
        accLblContrast: 'కాంట్రాస్ట్ మోడ్',
        footDesc: 'డిజిటల్ సాక్షరత, కనెక్టివిటీ మరియు ప్రభుత్వ సేవల ద్వారా గ్రామీణ సమాజాలను బలోపేతం చేయడం.',
        footHdrQuick: 'త్వరిత నావిగేషన్',
        footHdrGov: 'ముఖ్యమైన పోర్టల్స్',
        footHdrContact: 'సంప్రదించండి',
        footDisclaimer: 'తక్కువ బ్యాండ్‌విడ్త్ గల గ్రామీణ నెట్‌వర్క్‌లలో వేగంగా లోడ్ అయ్యేలా ఈ వెబ్‌సైట్ రూపొందించబడింది.',
        
        // Kiosk Detail Labels
        kOperator: 'నిర్వాహకుడు',
        kPhone: 'ఫోన్',
        kLocation: 'స్థానం',
        kStatusOnline: 'యాక్టివ్ / Active',
        
        // Tutorial Card titles and descriptions
        tutTitle1: 'ఇంటర్నెట్ ఉపయోగించడం',
        tutDesc1: 'సమాచారాన్ని శోధించడం, వెబ్‌సైట్‌లను తెరవడం మరియు ఆన్‌లైన్‌లో సురక్షితంగా ఉండటం ఎలాగో నేర్చుకోండి.',
        tutLink1: 'ప్రారంభించండి',
        tutTitle2: 'సురక్షిత మొబైల్ బ్యాంకింగ్',
        tutDesc2: 'UPI చెల్లింపులు, సురక్షితమైన పిన్ సెటప్ మరియు ఆన్‌లైన్ మోసాలను గుర్తించడం నేర్చుకోండి.',
        tutLink2: 'ప్రారంభించండి',
        tutTitle3: 'డిజిటల్ వ్యవసాయం',
        tutDesc3: 'పంట ధరలను తనిఖీ చేయడం, భూమి రికార్డులను డౌన్‌లోడ్ చేయడం మరియు వాతావరణ హెచ్చరికలను చూడటం ఆన్‌లైన్ ద్వారా చేయండి.',
        tutLink3: 'ప్రారంభించండి',
        tutTitle4: 'ఆన్‌లైన్ విద్య',
        tutDesc4: 'పాఠశాల పిల్లల కోసం దీక్ష (DIKSHA) & స్వయం (SWAYAM) వంటి ఉచిత విద్యా పోర్టల్‌లను అన్వేషించండి.',
        tutLink4: 'ప్రారంభించండి',
        
        // Government service card translations
        srvTitle1: 'పీఎం-కిసాన్ సమ్మాన్ నిధి',
        srvDesc1: 'రైతు ప్రయోజనాల చెల్లింపు స్థితి, రిజిస్ట్రేషన్ సమాచారం మరియు భూమి రికార్డులను తనిఖీ చేయండి.',
        srvTitle2: 'ఏపీ గ్రామ సచివాలయం',
        srvDesc2: 'గ్రామ సచివాలయం ద్వారా ఒకే చోట అన్ని రాష్ట్ర ప్రభుత్వ సేవలను పొందండి.',
        srvTitle3: 'ఏపీ ఫైబర్ నెట్ (AP FiberNet)',
        srvDesc3: 'ఆంధ్రప్రదేశ్ గ్రామీణ ప్రాంతాలకు తక్కువ ధరకే హై-స్పీడ్ బ్రాడ్‌బ్యాండ్ మరియు కేబుల్ సేవలు.',
        srvTitle4: 'డిజిలాకర్',
        srvDesc4: 'ఆధార్, డ్రైవింగ్ లైసెన్స్ మరియు పాఠశాల మార్కుల పత్రాల వంటి ధృవీకృత పత్రాలను సురక్షితంగా పొందండి.',
    }
};

// --- MULTILINGUAL RENDER FUNCTION ---
function renderLanguage(lang) {
    currentLanguage = lang;
    const trans = TRANSLATIONS[lang];

    // Simple Map elements by ID
    document.getElementById('brand-logo').innerHTML = trans.brandLogo;
    document.getElementById('nav-home').innerText = trans.navHome;
    document.getElementById('nav-locator').innerText = trans.navLocator;
    document.getElementById('nav-literacy').innerText = trans.navLiteracy;
    document.getElementById('nav-services').innerText = trans.navServices;
    document.getElementById('nav-empower').innerText = trans.navEmpower;
    
    // Sync the selector value
    if (document.getElementById('lang-selector')) {
        document.getElementById('lang-selector').value = lang;
    }
    
    document.getElementById('hero-badge-text').innerText = trans.heroBadgeText;
    document.getElementById('hero-title').innerHTML = trans.heroTitle;
    document.getElementById('hero-desc').innerText = trans.heroDesc;
    document.getElementById('cta-find').innerText = trans.ctaFind;
    document.getElementById('cta-learn').innerText = trans.ctaLearn;
    
    document.getElementById('stat-panchayats').innerText = trans.statPanchayats;
    document.getElementById('stat-literate').innerText = trans.statLiterate;
    document.getElementById('stat-connected').innerText = trans.statConnected;

    document.getElementById('locator-title').innerText = trans.locatorTitle;
    document.getElementById('locator-subtitle').innerText = trans.locatorSubtitle;
    document.getElementById('locator-search').placeholder = trans.locatorSearchPlaceholder;

    document.getElementById('literacy-title').innerText = trans.literacyTitle;
    document.getElementById('literacy-subtitle').innerText = trans.literacySubtitle;
    document.getElementById('quiz-card-title').innerText = trans.quizCardTitle;

    document.getElementById('services-title').innerText = trans.servicesTitle;
    document.getElementById('services-subtitle').innerText = trans.servicesSubtitle;

    document.getElementById('form-badge-text').innerText = trans.formBadgeText;
    document.getElementById('form-header').innerText = trans.formHeader;
    document.getElementById('form-subheader').innerText = trans.formSubheader;
    document.getElementById('info-call-title').innerText = trans.infoCallTitle;
    document.getElementById('info-email-title').innerText = trans.infoEmailTitle;
    document.getElementById('form-box-title').innerText = trans.formBoxTitle;
    
    document.getElementById('lbl-name').innerText = trans.lblName;
    document.getElementById('lbl-phone').innerText = trans.lblPhone;
    document.getElementById('lbl-state').innerText = trans.lblState;
    document.getElementById('lbl-district').innerText = trans.lblDistrict;
    document.getElementById('lbl-village').innerText = trans.lblVillage;
    document.getElementById('lbl-msg').innerText = trans.lblMsg;
    document.getElementById('btn-submit').innerText = trans.btnSubmit;
    
    document.getElementById('succ-title').innerText = trans.succTitle;
    document.getElementById('succ-desc').innerHTML = trans.succDesc;
    document.getElementById('succ-btn-back').innerText = trans.succBtnBack;
    
    document.getElementById('acc-panel-title').innerText = trans.accPanelTitle;
    document.getElementById('acc-lbl-text').innerText = trans.accLblText;
    document.getElementById('acc-lbl-contrast').innerText = trans.accLblContrast;
    
    document.getElementById('foot-desc').innerText = trans.footDesc;
    document.getElementById('foot-hdr-quick').innerText = trans.footHdrQuick;
    document.getElementById('foot-hdr-gov').innerText = trans.footHdrGov;
    document.getElementById('foot-hdr-contact').innerText = trans.footHdrContact;
    document.getElementById('foot-disclaimer').innerText = trans.footDisclaimer;

    document.getElementById('foot-nav-home').innerText = trans.navHome;
    document.getElementById('foot-nav-locator').innerText = trans.navLocator;
    document.getElementById('foot-nav-literacy').innerText = trans.navLiteracy;
    document.getElementById('foot-nav-services').innerText = trans.navServices;

    // Tutorials Title & Desc Map
    document.getElementById('tut-title-1').innerText = trans.tutTitle1;
    document.getElementById('tut-desc-1').innerText = trans.tutDesc1;
    document.getElementById('tut-link-1').innerHTML = trans.tutLink1 + ' <i class="fa-solid fa-arrow-right"></i>';
    
    document.getElementById('tut-title-2').innerText = trans.tutTitle2;
    document.getElementById('tut-desc-2').innerText = trans.tutDesc2;
    document.getElementById('tut-link-2').innerHTML = trans.tutLink2 + ' <i class="fa-solid fa-arrow-right"></i>';

    document.getElementById('tut-title-3').innerText = trans.tutTitle3;
    document.getElementById('tut-desc-3').innerText = trans.tutDesc3;
    document.getElementById('tut-link-3').innerHTML = trans.tutLink3 + ' <i class="fa-solid fa-arrow-right"></i>';

    document.getElementById('tut-title-4').innerText = trans.tutTitle4;
    document.getElementById('tut-desc-4').innerText = trans.tutDesc4;
    document.getElementById('tut-link-4').innerHTML = trans.tutLink4 + ' <i class="fa-solid fa-arrow-right"></i>';

    // Service Portal items
    document.getElementById('srv-title-1').innerText = trans.srvTitle1;
    document.getElementById('srv-desc-1').innerText = trans.srvDesc1;
    document.getElementById('srv-title-2').innerText = trans.srvTitle2;
    document.getElementById('srv-desc-2').innerText = trans.srvDesc2;
    document.getElementById('srv-title-3').innerText = trans.srvTitle3;
    document.getElementById('srv-desc-3').innerText = trans.srvDesc3;
    document.getElementById('srv-title-4').innerText = trans.srvTitle4;
    document.getElementById('srv-desc-4').innerText = trans.srvDesc4;

    // Re-render variable content widgets
    filterKiosks();
    renderQuizQuestion();
}

// --- INTERNET ACCESS / KIOSK LOCATOR LOGIC ---
function renderKiosks(kiosksList) {
    const grid = document.getElementById('locator-results-grid');
    grid.innerHTML = '';
    const trans = TRANSLATIONS[currentLanguage];

    if (kiosksList.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 16px;"></i>
                <p>${currentLanguage === 'en' ? 'No internet kiosks found matching your search.' : (currentLanguage === 'hi' ? 'आपकी खोज से मेल खाने वाला कोई इंटरनेट किओस्क नहीं मिला।' : 'మీ శోధనకు సరిపోయే ఇంటర్నెట్ కియోస్క్‌లు ఏవీ కనుగొనబడలేదు.')}</p>
            </div>
        `;
        return;
    }

    kiosksList.forEach(kiosk => {
        let title = kiosk.name;
        let type = kiosk.type;
        let operator = kiosk.operator;
        let village = kiosk.village;
        let district = kiosk.district;
        let state = kiosk.state;
        let amenities = kiosk.amenities;

        if (currentLanguage === 'hi') {
            title = kiosk.nameHindi || kiosk.name;
            type = kiosk.typeHindi || kiosk.type;
            operator = kiosk.operatorHindi || kiosk.operator;
            village = kiosk.villageHindi || kiosk.village;
            district = kiosk.districtHindi || kiosk.district;
            state = kiosk.stateHindi || kiosk.state;
            amenities = kiosk.amenitiesHindi || kiosk.amenities;
        } else if (currentLanguage === 'te') {
            title = kiosk.nameTelugu || kiosk.name;
            type = kiosk.typeTelugu || kiosk.type;
            operator = kiosk.operatorTelugu || kiosk.operator;
            village = kiosk.villageTelugu || kiosk.village;
            district = kiosk.districtTelugu || kiosk.district;
            state = kiosk.stateTelugu || kiosk.state;
            amenities = kiosk.amenitiesTelugu || kiosk.amenities;
        }

        let amenityTags = amenities.map(tag => `<span class="amenity-tag">${tag}</span>`).join('');

        const card = document.createElement('div');
        card.className = 'kiosk-card';
        card.innerHTML = `
            <div>
                <div class="kiosk-header">
                    <div>
                        <div class="kiosk-title">${title}</div>
                        <div style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600;">${type}</div>
                    </div>
                    <span class="status-badge status-online">${trans.kStatusOnline}</span>
                </div>
                
                <div class="kiosk-meta">
                    <p><i class="fa-solid fa-user"></i> <strong>${trans.kOperator}:</strong> ${operator}</p>
                    <p><i class="fa-solid fa-phone"></i> <strong>${trans.kPhone}:</strong> ${phoneLink(kiosk.phone)}</p>
                    <p><i class="fa-solid fa-location-dot"></i> <strong>${trans.kLocation}:</strong> ${village}, ${district}, ${state}</p>
                </div>
            </div>
            
            <div class="kiosk-amenities">
                ${amenityTags}
            </div>
        `;
        grid.appendChild(card);
    });
}

function phoneLink(phone) {
    return `<a href="tel:${phone.replace(/\s/g, '')}" style="color: inherit; text-decoration: none;">${phone}</a>`;
}

function filterKiosks() {
    const searchVal = document.getElementById('locator-search').value.toLowerCase().trim();
    if (!searchVal) {
        renderKiosks(KIOSKS_DATABASE);
        return;
    }

    const filtered = KIOSKS_DATABASE.filter(kiosk => {
        return (
            kiosk.name.toLowerCase().includes(searchVal) ||
            (kiosk.nameHindi && kiosk.nameHindi.includes(searchVal)) ||
            (kiosk.nameTelugu && kiosk.nameTelugu.includes(searchVal)) ||
            kiosk.village.toLowerCase().includes(searchVal) ||
            (kiosk.villageHindi && kiosk.villageHindi.includes(searchVal)) ||
            (kiosk.villageTelugu && kiosk.villageTelugu.includes(searchVal)) ||
            kiosk.district.toLowerCase().includes(searchVal) ||
            (kiosk.districtHindi && kiosk.districtHindi.includes(searchVal)) ||
            (kiosk.districtTelugu && kiosk.districtTelugu.includes(searchVal)) ||
            kiosk.state.toLowerCase().includes(searchVal) ||
            (kiosk.stateHindi && kiosk.stateHindi.includes(searchVal)) ||
            (kiosk.stateTelugu && kiosk.stateTelugu.includes(searchVal))
        );
    });

    renderKiosks(filtered);
}

// --- DIGITAL LITERACY EDUCATIONAL MODULES DATA ---
const MODULES_CONTENT = {
    internet: {
        title: "Using the Internet",
        titleHindi: "इंटरनेट का उपयोग",
        titleTelugu: "ఇంటర్నెట్ ఉపయోగించడం",
        steps: [
            {
                title: "Understanding Web Browsers",
                titleHindi: "वेब ब्राउज़र को समझना",
                titleTelugu: "వెబ్ బ్రౌజర్‌లను అర్థం చేసుకోవడం",
                desc: "A browser is an application like Google Chrome or Firefox. It lets you type URLs (like www.google.com) to view web pages.",
                descHindi: "ब्राउज़र गूगल क्रोम या फ़ायरफ़ॉक्स जैसा एक ऐप है। यह आपको वेब पेज देखने के लिए URL (जैसे www.google.com) टाइप करने की अनुमति देता है।",
                descTelugu: "బ్రౌజర్ అనేది గూగుల్ క్రోమ్ లేదా ఫైర్‌ఫాక్స్ వంటి అప్లికేషన్. ఇది వెబ్ పేజీలను చూడటానికి URLలను (www.google.com వంటివి) టైప్ చేయడానికి మిమ్మల్ని అనుమతిస్తుంది."
            },
            {
                title: "How to Search Online",
                titleHindi: "ऑनलाइन कैसे खोजें",
                titleTelugu: "ఆన్‌లైన్‌లో శోధించడం ఎలా",
                desc: "Open a search engine like Google, type what you are looking for in simple words (e.g. 'how to grow wheat' or 'rural bank office'), and hit search.",
                descHindi: "गूगल जैसा सर्च इंजन खोलें, सरल शब्दों में टाइप करें कि आप क्या ढूंढ रहे हैं (जैसे 'गेहूं कैसे उगाएं' या 'ग्रामीण बैंक कार्यालय') और सर्च पर क्लिक करें।",
                descTelugu: "గూగుల్ వంటి సెర్చ్ ఇంజిన్‌ను తెరిచి, సాధారణ పదాలలో మీరు వెతుకుతున్నదాన్ని టైప్ చేసి (ఉదా. 'గోధుమలు ఎలా పండించాలి') సెర్చ్ చేయండి."
            },
            {
                title: "Internet Safety Tips",
                titleHindi: "इंटरनेट सुरक्षा टिप्स",
                titleTelugu: "ఇంటర్నెట్ భద్రతా చిట్కాలు",
                desc: "Never share passwords, Aadhaar card numbers, or bank details with strange websites. Always check if the website URL starts with 'https://' (secure connection).",
                descHindi: "अजनबी वेबसाइटों के साथ कभी भी पासवर्ड, आधार कार्ड नंबर या बैंक विवरण साझा न करें। हमेशा जांचें कि वेबसाइट का यूआरएल 'https://' से शुरू होता है या नहीं।",
                descTelugu: "తెలియని వెబ్‌సైట్‌లతో పాస్‌వర్డ్‌లు, ఆధార్ కార్డ్ నంబర్లు లేదా బ్యాంక్ వివరాలను ఎప్పుడూ పంచుకోకండి. వెబ్‌సైట్ URL 'https://' తో ప్రారంభమవుతుందో లేదో ఎల్లప్పుడూ తనిఖీ చేయండి."
            }
        ]
    },
    banking: {
        title: "Safe Mobile Banking",
        titleHindi: "सुरक्षित मोबाइल बैंकिंग",
        titleTelugu: "సురక్షిత మొబైల్ బ్యాంకింగ్",
        steps: [
            {
                title: "What is UPI?",
                titleHindi: "UPI क्या है?",
                titleTelugu: "UPI అంటే ఏమిటి?",
                desc: "Unified Payments Interface (UPI) lets you send money instantly to anyone using their mobile number or a QR code scanner on apps like BHIM, Google Pay, or PhonePe.",
                descHindi: "यूनिफाइड पेमेंट्स इंटरफेस (UPI) आपको BHIM, गूगल पे या फोनपे जैसे ऐप्स पर मोबाइल नंबर या QR कोड स्कैनर का उपयोग करके किसी को भी तुरंत पैसे भेजने की अनुमति देता है।",
                descTelugu: "యూనిఫైడ్ పేమెంట్స్ ఇంటర్‌ఫేస్ (UPI) భీమ్, గూగుల్ పే లేదా ఫోన్‌పే వంటి యాప్‌లలో మొబైల్ నంబర్ లేదా క్యూఆర్ కోడ్ స్కాన్ ఉపయోగించి ఎవరికైనా తక్షణమే డబ్బు పంపడానికి మిమ్మల్ని అనుమతిస్తుంది."
            },
            {
                title: "Creating a Secure UPI PIN",
                titleHindi: "सुरक्षित UPI पिन बनाना",
                titleTelugu: "సురక్షితమైన UPI పిన్‌ను సృష్టించడం",
                desc: "Your UPI PIN is a secret 4 or 6-digit number. Never use simple numbers like 1234 or your birthday. Never share your PIN with anyone, including bank officers.",
                descHindi: "आपका UPI पिन एक गुप्त 4 या 6 अंकों का नंबर है। 1234 या अपने जन्मदिन जैसी सरल संख्याओं का उपयोग कभी न करें। अपना पिन कभी किसी के साथ साझा न करें।",
                descTelugu: "మీ UPI పిన్ అనేది రహస్యమైన 4 లేదా 6 అంకెల సంఖ్య. 1234 లేదా మీ పుట్టినరోజు వంటి సాధారణ సంఖ్యలను ఎప్పుడూ ఉపయోగించవద్దు. మీ పిన్‌ను ఎవరితోనూ పంచుకోకండి."
            },
            {
                title: "Spotting Phishing Scams",
                titleHindi: "धोखाधड़ी को पहचानना",
                titleTelugu: "మోసాలను గుర్తించడం",
                desc: "Banks will never call you asking for OTPs (One-Time Passwords). If you receive an SMS saying you won a lottery or your bank account will close, do not click on the link.",
                descHindi: "बैंक कभी भी आपको फोन करके OTP (वन-टाइम पासवर्ड) नहीं मांगेंगे। यदि आपको लॉटरी जीतने या खाता बंद होने का एसएमएस प्राप्त होता है, तो लिंक पर क्लिक न करें।",
                descTelugu: "బ్యాంకులు మీకు ఎప్పుడూ ఫోన్ చేసి OTPలు అడగవు. ఒకవేళ మీకు లాటరీ గెలిచినట్లు లేదా మీ బ్యాంక్ ఖాతా మూసివేయబడుతున్నట్లు SMS వస్తే, ఆ లింక్‌లపై క్లిక్ చేయవద్దు."
            }
        ]
    },
    agriculture: {
        title: "Digital Agriculture",
        titleHindi: "डिजिटल कृषि",
        titleTelugu: "డిజిటల్ వ్యవసాయం",
        steps: [
            {
                title: "Checking Mandi Crop Prices",
                titleHindi: "मंडी फसल की कीमतें देखना",
                titleTelugu: "మండీ పంట ధరలను తనిఖీ చేయడం",
                desc: "Use portals like e-NAM (National Agriculture Market) to view real-time market prices of crops in your district to ensure you sell for a fair profit.",
                descHindi: "फसलों के वास्तविक समय के बाजार मूल्य देखने के लिए ई-नाम (e-NAM) जैसे पोर्टल का उपयोग करें, जिससे यह सुनिश्चित हो सके कि आप उचित लाभ पर बेच रहे हैं।",
                descTelugu: "మీ జిల్లాలో పంటల నిజ-సమయ మార్కెట్ ధరలను చూడటానికి మరియు సరసమైన లాభాన్ని నిర్ధారించడానికి e-NAM (నేషనల్ అగ్రికల్చర్ మార్కెట్) వంటి పోర్టల్‌లను ఉపయోగించండి."
            },
            {
                title: "Soil Health Cards",
                titleHindi: "मृदा स्वास्थ्य कार्ड",
                titleTelugu: "మృదా ఆరోగ్య కార్డులు",
                desc: "Register your soil test online. Get dynamic suggestions about exactly how much fertilizer your specific fields need to grow better, healthier yields.",
                descHindi: "अपना मिट्टी परीक्षण ऑनलाइन दर्ज करें। बेहतर और स्वास्थ्यवर्धक फसल उगाने के लिए उर्वरक की मात्रा के बारे में गतिशील सुझाव प्राप्त करें।",
                descTelugu: "మీ నేల పరీక్షను ఆన్‌లైన్ లో నమోదు చేసుకోండి. మీ నిర్దిష్ట పొలాలలో పంటలు మెరుగ్గా పెరగడానికి ఎంత ఎరువులు అవసరమో సూచనలు పొందండి."
            },
            {
                title: "Weather Alerts & Advisories",
                titleHindi: "मौसम अलर्ट और सलाह",
                titleTelugu: "వాతావరణ హెచ్చరికలు",
                desc: "Download government applications (like Mausam app) to get real-time local rainfall predictions and save your crops before heavy storms.",
                descHindi: "स्थानीय वर्षा की भविष्यवाणी प्राप्त करने और भारी तूफान से पहले अपनी फसलों को बचाने के लिए सरकारी ऐप (जैसे मौसम ऐप) डाउनलोड करें।",
                descTelugu: "నిజ-సమయ వర్షపాత అంచనాలను పొందడానికి మరియు భారీ తుఫానుల నుండి మీ పంటలను రక్షించడానికి వాతావరణ యాప్‌లను డౌన్‌లోడ్ చేసుకోండి."
            }
        ]
    },
    education: {
        title: "Online Education Portals",
        titleHindi: "ऑनलाइन शिक्षा पोर्टल",
        titleTelugu: "ఆన్‌లైన్ విద్య",
        steps: [
            {
                title: "DIKSHA Educational App",
                titleHindi: "दीक्षा (DIKSHA) एजुकेशनल ऐप",
                titleTelugu: "దీక్ష (DIKSHA) విద్యా యాప్",
                desc: "DIKSHA offers QR-code integrated school textbooks, interactive online video courses, and worksheets for kids from 1st to 12th grade in regional languages.",
                descHindi: "दीक्षा पोर्टल क्षेत्रीय भाषाओं में पहली से बारहवीं कक्षा के बच्चों के लिए क्यूआर-कोड एकीकृत स्कूल पाठ्यपुस्तकें और इंटरैक्टिव ऑनलाइन वीडियो प्रदान करता है।",
                descTelugu: "దీక్షా పోర్టల్ ప్రాంతీయ భాషలలో 1 నుండి 12వ తరగతి పిల్లల కోసం క్యూఆర్-కోడ్ ఆధారిత పాఠ్యపుస్తకాలు, వీడియో తరగతులు మరియు వర్క్‌షీట్‌లను అందిస్తుంది."
            },
            {
                title: "SWAYAM Free Learning",
                titleHindi: "स्वयं (SWAYAM) मुफ्त शिक्षा",
                titleTelugu: "స్వయం (SWAYAM) ఉచిత అభ్యాసం",
                desc: "Free online certificate courses designed by top professors for college students, spanning science, agriculture, arts, and languages.",
                descHindi: "विज्ञान, कृषि, कला और भाषाओं में कॉलेज छात्रों के लिए सर्वश्रेष्ठ प्रोफेसरों द्वारा डिज़ाइन किए गए मुफ्त ऑनलाइन प्रमाण पत्र पाठ्यक्रम।",
                descTelugu: "సైన్స్, వ్యవసాయం, కళలు మరియు భాషలలో అగ్రశ్రేణి ప్రొఫెసర్లు రూపొందించిన ఉచిత ఆన్‌లైన్ సర్టిఫికేట్ కోర్సులు."
            }
        ]
    }
};

// --- MODULE POPUP MANAGEMENT ---
function openModule(moduleKey) {
    const modal = document.getElementById('learning-modal');
    const body = document.getElementById('modal-content-body');
    const mod = MODULES_CONTENT[moduleKey];
    const trans = TRANSLATIONS[currentLanguage];

    let title = mod.title;
    if (currentLanguage === 'hi') title = mod.titleHindi;
    if (currentLanguage === 'te') title = mod.titleTelugu;
    
    let stepsHTML = '';
    mod.steps.forEach((step, idx) => {
        let stepTitle = step.title;
        let stepDesc = step.desc;

        if (currentLanguage === 'hi') {
            stepTitle = step.titleHindi;
            stepDesc = step.descHindi;
        } else if (currentLanguage === 'te') {
            stepTitle = step.titleTelugu;
            stepDesc = step.descTelugu;
        }
        
        stepsHTML += `
            <div class="step-card">
                <div class="step-number">${idx + 1}</div>
                <div>
                    <h4 style="font-family: var(--font-heading); font-weight:700; margin-bottom: 6px;">${stepTitle}</h4>
                    <p style="font-size: 0.95rem; line-height:1.5;">${stepDesc}</p>
                </div>
            </div>
        `;
    });

    let moduleSubtitle = 'Follow these simple steps to learn the concept:';
    let closeBtnText = 'Done & Close';
    if (currentLanguage === 'hi') {
        moduleSubtitle = 'इस विषय को समझने के लिए इन सरल चरणों का पालन करें:';
        closeBtnText = 'समाप्त और बंद करें';
    } else if (currentLanguage === 'te') {
        moduleSubtitle = 'ఈ విషయాన్ని నేర్చుకోవడానికి ఈ క్రింది సరళమైన పద్ధతులను అనుసరించండి:';
        closeBtnText = 'పూర్తయింది & మూసివేయండి';
    }

    body.innerHTML = `
        <h2 style="font-family: var(--font-heading); font-size: 1.85rem; font-weight:800; margin-bottom: 8px; color: var(--primary-color)">${title}</h2>
        <p style="margin-bottom: 24px; color: var(--text-secondary)">
            ${moduleSubtitle}
        </p>
        <div style="display: flex; flex-direction: column; gap: 16px;">
            ${stepsHTML}
        </div>
        <button class="btn btn-primary" onclick="closeModule()" style="margin-top: 24px; width: 100%;">
            ${closeBtnText}
        </button>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // prevent scrolling underneath
}

function closeModule() {
    const modal = document.getElementById('learning-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// --- INTERACTIVE QUIZ ENGINE ---
const QUIZ_QUESTIONS = {
    en: [
        {
            question: "Which of the following is completely safe to share with strangers online?",
            options: ["Your Bank Account Password", "Your Secret UPI PIN", "Your Personal ATM Card Pin", "None of these (All must be kept secret)"],
            correct: 3
        },
        {
            question: "Which official government mobile app is used for direct financial transactions via UPI?",
            options: ["BHIM App", "Mausam App", "Aarogya Setu", "DigiLocker"],
            correct: 0
        },
        {
            question: "Where can a farmer check official daily mandi market prices for crops online?",
            options: ["Social Media Platforms", "e-NAM (National Agriculture Market)", "Any online gaming site", "YouTube Comments"],
            correct: 1
        },
        {
            question: "What does the 'https://' at the start of a website address indicate?",
            options: ["The website is written in English", "The connection to the website is encrypted and secure", "The website is only for kids", "The website is very slow"],
            correct: 1
        },
        {
            question: "Which digital service lets you securely carry digital copies of certificates like Aadhaar and school reports?",
            options: ["Instagram", "WhatsApp Business", "DigiLocker", "Truecaller"],
            correct: 2
        }
    ],
    hi: [
        {
            question: "निम्नलिखित में से किसे इंटरनेट पर अजनबियों के साथ साझा करना पूरी तरह से सुरक्षित है?",
            options: ["आपका बैंक पासवर्ड", "आपका सीक्रेट UPI पिन", "आपका एटीएम कार्ड पिन", "इनमें से कोई नहीं (सभी गुप्त रखने चाहिए)"],
            correct: 3
        },
        {
            question: "UPI के माध्यम से प्रत्यक्ष वित्तीय लेनदेन के लिए किस आधिकारिक सरकारी मोबाइल ऐप का उपयोग किया जाता है?",
            options: ["भीम (BHIM) ऐप", "मौसम ऐप", "आरोग्य सेतु", "डिजिलॉकर"],
            correct: 0
        },
        {
            question: "एक किसान ऑनलाइन फसलों के लिए आधिकारिक दैनिक मंडी बाजार मूल्य कहां देख सकता है?",
            options: ["सोशल मीडिया प्लेटफॉर्म", "ई-नाम (e-NAM)", "कोई भी ऑनलाइन गेमिंग साइट", "यूट्यूब कमेंट्स"],
            correct: 1
        },
        {
            question: "वेबसाइट पते की शुरुआत में 'https://' क्या दर्शाता है?",
            options: ["वेबसाइट अंग्रेजी में लिखी गई है", "वेबसाइट का कनेक्शन एन्क्रिप्टेड और सुरक्षित है", "वेबसाइट केवल बच्चों के लिए है", "वेबसाइट बहुत धीमी है"],
            correct: 1
        },
        {
            question: "कौन सी डिजिटल सेवा आपको आधार और स्कूल प्रमाण पत्र जैसी डिजिटल प्रतियां सुरक्षित रखने की अनुमति देती है?",
            options: ["इंस्टाग्राम", "व्हाट्सएप बिजनेस", "डिजिलॉकर", "ट्रूकॉलर"],
            correct: 2
        }
    ],
    te: [
        {
            question: "క్రింది వాటిలో దేనిని ఆన్‌లైన్‌లో అపరిచితులతో పంచుకోవడం పూర్తిగా సురక్షితం?",
            options: ["మీ బ్యాంక్ ఖాతా పాస్‌వర్డ్", "మీ రహస్య UPI పిన్", "మీ ఏటీఎం కార్డు పిన్", "ఇవేవీ కావు (అన్నింటినీ రహస్యంగా ఉంచాలి)"],
            correct: 3
        },
        {
            question: "UPI ద్వారా నేరుగా ఆర్థిక లావాదేవీల కోసం ఉపయోగించే అధికారిక ప్రభుత్వ మొబైల్ యాప్ ఏది?",
            options: ["భీమ్ (BHIM) యాప్", "వాతావరణ (Mausam) యాప్", "ఆరోగ్య సేతు", "డిజిలాకర్"],
            correct: 0
        },
        {
            question: "ఒక రైతు ఆన్‌లైన్‌లో పంటల కోసం అధికారిక రోజువారీ మండీ మార్కెట్ ధరలను ఎక్కడ తనిఖీ చేయవచ్చు?",
            options: ["సోషల్ మీడియా ప్లాట్‌ఫారమ్‌లు", "e-NAM (నేషనల్ అగ్రికల్చర్ మార్కెట్)", "ఏదైనా ఆన్‌లైన్ గేమ్ సైట్", "యూట్యూబ్ కామెంట్లు"],
            correct: 1
        },
        {
            question: "వెబ్‌సైట్ చిరునామా ప్రారంభంలో ఉన్న 'https://' దేనిని సూచిస్తుంది?",
            options: ["వెబ్‌సైట్ ఆంగ్లంలో వ్రాయబడిందని", "వెబ్‌సైట్ కనెక్షన్ సురక్షితంగా మరియు గుప్తీకరించబడిందని (ఎన్క్రిప్ట్ చేయబడిందని)", "వెబ్‌సైట్ కేవలం పిల్లల కోసమేనని", "వెబ్‌సైట్ చాలా నెమ్మదిగా ఉందని"],
            correct: 1
        },
        {
            question: "ఆధార్ మరియు పాఠశాల నివేదికల వంటి ధృవీకరణ పత్రాల డిజిటల్ కాపీలను సురక్షితంగా తీసుకెళ్లడానికి ఏ డిజిటల్ సేవ మిమ్మల్ని అనుమతిస్తుంది?",
            options: ["ఇన్‌స్టాగ్రామ్", "వాట్సాప్ బిజినెస్", "డిజిలాకర్", "ట్రూకాలర్"],
            correct: 2
        }
    ]
};

let quizCurrentIndex = 0;
let quizScore = 0;
let quizSelectedAnswer = null;

function renderQuizQuestion() {
    const questions = QUIZ_QUESTIONS[currentLanguage] || QUIZ_QUESTIONS['en'];
    const container = document.getElementById('quiz-container');
    const trans = TRANSLATIONS[currentLanguage];

    // Check if quiz is finished
    if (quizCurrentIndex >= questions.length) {
        renderQuizResult();
        return;
    }

    const q = questions[quizCurrentIndex];
    
    // Header updates
    let progressText = `Question ${quizCurrentIndex + 1} of ${questions.length}`;
    if (currentLanguage === 'hi') {
        progressText = `प्रश्न ${quizCurrentIndex + 1} का ${questions.length}`;
    } else if (currentLanguage === 'te') {
        progressText = `ప్రశ్న ${quizCurrentIndex + 1} లలో ${questions.length}`;
    }
    document.getElementById('quiz-progress-text').innerText = progressText;
    
    // Question text
    document.getElementById('quiz-question-text').innerText = q.question;

    // Options mapping
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = '';
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt-btn';
        btn.innerText = opt;
        btn.onclick = () => selectQuizOption(idx);
        optionsContainer.appendChild(btn);
    });

    // Disable Next Button
    const nextBtn = document.getElementById('quiz-next-btn');
    let nextBtnText = 'Submit Answer';
    if (currentLanguage === 'hi') nextBtnText = 'उत्तर जमा करें';
    if (currentLanguage === 'te') nextBtnText = 'సమర్పించండి';
    nextBtn.innerText = nextBtnText;
    nextBtn.disabled = true;
    quizSelectedAnswer = null;
}

function selectQuizOption(index) {
    const options = document.getElementById('quiz-options-container').children;
    for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
    }
    options[index].classList.add('selected');
    quizSelectedAnswer = index;
    document.getElementById('quiz-next-btn').disabled = false;
}

function submitAnswer() {
    const questions = QUIZ_QUESTIONS[currentLanguage] || QUIZ_QUESTIONS['en'];
    const q = questions[quizCurrentIndex];

    if (quizSelectedAnswer === q.correct) {
        quizScore++;
    }

    quizCurrentIndex++;
    renderQuizQuestion();
}

function renderQuizResult() {
    const body = document.getElementById('quiz-body');
    const progress = document.getElementById('quiz-progress-text');
    const trans = TRANSLATIONS[currentLanguage];
    
    progress.innerText = currentLanguage === 'en' ? 'Completed' : (currentLanguage === 'hi' ? 'पूर्ण हुआ' : 'పూర్తయింది');
    
    const percentage = (quizScore / 5) * 100;
    
    let resultHTML = '';
    
    if (quizScore >= 4) {
        // High Score: Earn Badge
        let titleText = 'Congratulations Digital Citizen!';
        let descText = `You scored ${quizScore}/5 (${percentage}%). You have earned your Gramin Pragati Digital Citizen Badge!`;
        let btnText = 'Retry Quiz';
        if (currentLanguage === 'hi') {
            titleText = 'बधाई हो डिजिटल नागरिक!';
            descText = `आपने ${quizScore}/5 (${percentage}%) स्कोर किया है। आपने ग्रामीण प्रगति डिजिटल नागरिक बैज प्राप्त किया है!`;
            btnText = 'प्रश्नोत्तरी दोबारा शुरू करें';
        } else if (currentLanguage === 'te') {
            titleText = 'అభినందనలు డిజిటల్ సిటిజన్!';
            descText = `మీరు ${quizScore}/5 (${percentage}%) మార్కులు సాధించారు. మీరు గ్రామీణ ప్రగతి డిజిటల్ సిటిజన్ బ్యాడ్జ్ పొందారు!`;
            btnText = 'మళ్ళీ ప్రయత్నించండి';
        }

        resultHTML = `
            <div class="quiz-result">
                <div class="badge-wrapper"><i class="fa-solid fa-award"></i></div>
                <h4 style="font-family: var(--font-heading); font-size:1.35rem; font-weight:700; margin-bottom: 12px; color: var(--secondary-color)">
                    ${titleText}
                </h4>
                <p style="font-size:0.95rem; color: var(--text-secondary); margin-bottom: 20px;">
                    ${descText}
                </p>
                <button class="btn btn-primary" onclick="restartQuiz()">
                    ${btnText}
                </button>
            </div>
        `;
    } else {
        // Low Score: Retake
        let titleText = 'Keep Learning!';
        let descText = `You scored ${quizScore}/5. Review the digital literacy modules above and try again to earn your digital badge.`;
        let btnText = 'Try Again';
        if (currentLanguage === 'hi') {
            titleText = 'सीखते रहें!';
            descText = `आपने ${quizScore}/5 स्कोर किया। डिजिटल बैज अर्जित करने के लिए ऊपर दिए गए मॉड्यूलों को फिर से देखें और पुनः प्रयास करें।`;
            btnText = 'पुनः प्रयास करें';
        } else if (currentLanguage === 'te') {
            titleText = 'నేర్చుకుంటూ ఉండండి!';
            descText = `మీరు ${quizScore}/5 మార్కులు మాత్రమే పొందారు. డిజిటల్ బ్యాడ్జ్ సంపాదించడానికి పైన ఉన్న పాఠాలను చదివి మళ్ళీ ప్రయత్నించండి.`;
            btnText = 'మళ్ళీ ప్రయత్నించండి';
        }

        resultHTML = `
            <div class="quiz-result">
                <div style="font-size: 3.5rem; color: var(--primary-color); margin-bottom: 16px;"><i class="fa-regular fa-lightbulb"></i></div>
                <h4 style="font-family: var(--font-heading); font-size:1.35rem; font-weight:700; margin-bottom: 12px;">
                    ${titleText}
                </h4>
                <p style="font-size:0.95rem; color: var(--text-secondary); margin-bottom: 20px;">
                    ${descText}
                </p>
                <button class="btn btn-primary" onclick="restartQuiz()">
                    ${btnText}
                </button>
            </div>
        `;
    }

    body.innerHTML = resultHTML;
}

function restartQuiz() {
    quizCurrentIndex = 0;
    quizScore = 0;
    quizSelectedAnswer = null;

    // Reset Quiz Body layout
    const body = document.getElementById('quiz-body');
    body.innerHTML = `
        <p class="quiz-question" id="quiz-question-text"></p>
        <div class="quiz-options" id="quiz-options-container"></div>
        <div class="quiz-footer">
            <button class="btn btn-primary" id="quiz-next-btn" onclick="submitAnswer()" disabled></button>
        </div>
    `;

    renderQuizQuestion();
}

// --- CONNECTION REQUEST FORM LOGIC ---
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Simulate API Network lag
    const btn = document.getElementById('btn-submit');
    let loadingText = 'Sending...';
    if (currentLanguage === 'hi') loadingText = 'भेजा जा रहा है...';
    if (currentLanguage === 'te') loadingText = 'పంపుతోంది...';
    btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${loadingText}`;
    btn.disabled = true;

    setTimeout(() => {
        // Generate random request token
        const ticketNum = '#GP-' + Math.floor(10000 + Math.random() * 90000);
        document.getElementById('ticket-number').innerText = ticketNum;

        // Hide form and show success
        document.getElementById('connection-form').style.display = 'none';
        document.getElementById('form-success').style.display = 'flex';
    }, 1500);
}

function resetForm() {
    // Reset Form Input fields
    document.getElementById('connection-form').reset();

    // Show form, hide success
    document.getElementById('connection-form').style.display = 'block';
    document.getElementById('form-success').style.display = 'none';
    
    const btn = document.getElementById('btn-submit');
    btn.disabled = false;
    btn.innerText = TRANSLATIONS[currentLanguage].btnSubmit;
}

// --- ACCESSIBILITY CONTROL LOGIC ---
function toggleAccMenu() {
    const menu = document.getElementById('acc-menu');
    menu.classList.toggle('active');
}

// Close accessibility menu when clicking outside
document.addEventListener('click', function(e) {
    const floatBtn = document.querySelector('.acc-panel-float');
    if (floatBtn && !floatBtn.contains(e.target)) {
        document.getElementById('acc-menu').classList.remove('active');
    }
});

function setTheme(theme) {
    // Clear themes
    document.body.classList.remove('light-theme', 'dark-theme', 'high-contrast-theme');
    
    // Add current theme
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else if (theme === 'high-contrast') {
        document.body.classList.add('high-contrast-theme');
    } else {
        document.body.classList.add('dark-theme');
    }

    // Set active button styles in panel
    document.getElementById('acc-theme-dark').style.borderColor = theme === 'dark' ? 'var(--primary-color)' : '';
    document.getElementById('acc-theme-light').style.borderColor = theme === 'light' ? 'var(--primary-color)' : '';
    document.getElementById('acc-theme-hc').style.borderColor = theme === 'high-contrast' ? 'var(--primary-color)' : '';
}

function cycleContrast() {
    if (document.body.classList.contains('light-theme')) {
        setTheme('high-contrast');
    } else if (document.body.classList.contains('high-contrast-theme')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

function scaleFont(scale) {
    document.body.classList.remove('font-lg', 'font-xl');
    
    if (scale === 'lg') {
        document.body.classList.add('font-lg');
    } else if (scale === 'xl') {
        document.body.classList.add('font-xl');
    }
}

// --- INITIALIZER ---
window.addEventListener('DOMContentLoaded', () => {
    // Initial Render in English
    renderLanguage('en');
    
    // Highlight Active Navbar Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 120)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
