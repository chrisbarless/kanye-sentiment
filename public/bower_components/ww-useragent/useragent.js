/**
 * @fileoverview Returns a string reporting the user's browser, OS and versions
 * of both. Can also be extended to return platform data.
 * @author brian.hefter@weareinstrument.com (Brian Hefter)
 */

('undefined' !== typeof goog) && goog.provide('ww.userAgent');


// Creates a multi-dimensional array full of browser, os, and device regex data.
var browserData = {
  'userAgentParsers': [
    {
      'regex': '^(Opera)/(\\d+)\\.(\\d+) \\(Nintendo Wii',
      'familyReplacement': 'Wii'
    },
    {
      'regex': '(SeaMonkey|Camino)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)'
    },
    {
      'regex': '(Pale[Mm]oon)/(\\d+)\\.(\\d+)\\.?(\\d+)?',
      'familyReplacement': 'Pale Moon (Firefox Variant)'
    },
    {
      'regex': '(Fennec)/(\\d+)\\.(\\d+)\\.?([ab]?\\d+[a-z]*)',
      'familyReplacement': 'Firefox Mobile'
    },
    {
      'regex': '(Fennec)/(\\d+)\\.(\\d+)(pre)',
      'familyReplacement': 'Firefox Mobile'
    },
    {
      'regex': '(Fennec)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Firefox Mobile'
    },
    {
      'regex': 'Mobile.*(Firefox)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Firefox Mobile'
    },
    {
      'regex': '(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?)',
      'familyReplacement': 'Firefox ($1)'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)(a\\d+[a-z]*)',
      'familyReplacement': 'Firefox Alpha'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)(b\\d+[a-z]*)',
      'familyReplacement': 'Firefox Beta'
    },
    {
      'regex': '(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(a\\d+[a-z]*)',
      'familyReplacement': 'Firefox Alpha'
    },
    {
      'regex': '(Firefox)-(?:\\d+\\.\\d+)?/(\\d+)\\.(\\d+)(b\\d+[a-z]*)',
      'familyReplacement': 'Firefox Beta'
    },
    {
      'regex': '(Namoroka|Shiretoko|Minefield)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?',
      'familyReplacement': 'Firefox ($1)'
    },
    {
      'regex': '(Firefox).*Tablet browser (\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'MicroB'
    },
    {
      'regex': '(MozillaDeveloperPreview)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)?'
    },
    {
      'regex': '(Flock)/(\\d+)\\.(\\d+)(b\\d+?)'
    },
    {
      'regex': '(RockMelt)/(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Navigator)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Netscape'
    },
    {
      'regex': '(Navigator)/(\\d+)\\.(\\d+)([ab]\\d+)',
      'familyReplacement': 'Netscape'
    },
    {
      'regex': '(Netscape6)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Netscape'
    },
    {
      'regex': '(MyIBrow)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'My Internet Browser'
    },
    {
      'regex': '(Opera Tablet).*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?'
    },
    {
      'regex': '(Opera)/.+Opera Mobi.+Version/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Opera Mobile'
    },
    {
      'regex': 'Opera Mobi',
      'familyReplacement': 'Opera Mobile'
    },
    {
      'regex': '(Opera Mini)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Opera Mini)/att/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Opera)/9.80.*Version/(\\d+)\\.(\\d+)(?:\\.(\\d+))?'
    },
    {
      'regex': '(webOSBrowser)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(webOS)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'webOSBrowser'
    },
    {
      'regex': '(wOSBrowser).+TouchPad/(\\d+)\\.(\\d+)',
      'familyReplacement': 'webOS TouchPad'
    },
    {
      'regex': '(luakit)',
      'familyReplacement': 'LuaKit'
    },
    {
      'regex': '(Lightning)/(\\d+)\\.(\\d+)([ab]?\\d+[a-z]*)'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+(?:pre)?) \\(Swiftfox\\)',
      'familyReplacement': 'Swiftfox'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)([ab]\\d+[a-z]*)? \\(Swiftfox\\)',
      'familyReplacement': 'Swiftfox'
    },
    {
      'regex': 'rekonq',
      'familyReplacement': 'Rekonq'
    },
    {
      'regex': '(conkeror|Conkeror)/(\\d+)\\.(\\d+)\\.?(\\d+)?',
      'familyReplacement': 'Conkeror'
    },
    {
      'regex': '(konqueror)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Konqueror'
    },
    {
      'regex': '(WeTab)-Browser'
    },
    {
      'regex': '(Comodo_Dragon)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Comodo Dragon'
    },
    {
      'regex': '(YottaaMonitor|BrowserMob|HttpMonitor|YandexBot|Slurp|BingPreview|PagePeeker|ThumbShotsBot|WebThumb|URL2PNG|ZooShot|GomezA|Catchpoint bot|Willow Internet Crawler|Google SketchUp|Read%20Later)'
    },
    {
      'regex': '(Kindle)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Symphony) (\\d+).(\\d+)'
    },
    {
      'regex': '(Minimo)'
    },
    {
      'regex': '(CrMo)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Chrome Mobile'
    },
    {
      'regex': '(CriOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Chrome Mobile iOS'
    },
    {
      'regex': '(Chrome)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+) Mobile',
      'familyReplacement': 'Chrome Mobile'
    },
    {
      'regex': '(chromeframe)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Chrome Frame'
    },
    {
      'regex': '(UC Browser)(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(SLP Browser)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Tizen Browser'
    },
    {
      'regex': '(Epiphany)/(\\d+)\\.(\\d+).(\\d+)'
    },
    {
      'regex': '(SE 2\\.X) MetaSr (\\d+)\\.(\\d+)',
      'familyReplacement': 'Sogou Explorer'
    },
    {
      'regex': '(FlyFlow)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Baidu Explorer'
    },
    {
      'regex': '(Pingdom.com_bot_version_)(\\d+)\\.(\\d+)',
      'familyReplacement': 'PingdomBot'
    },
    {
      'regex': '(facebookexternalhit)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'FacebookBot'
    },
    {
      'regex': '(Twitterbot)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'TwitterBot'
    },
    {
      'regex': '(AdobeAIR|Chromium|FireWeb|Jasmine|ANTGalio|Midori|Fresco|Lobo|PaleMoon|Maxthon|Lynx|OmniWeb|Dillo|Camino|Demeter|Fluid|Fennec|Shiira|Sunrise|Chrome|Flock|Netscape|Lunascape|WebPilot|Vodafone|NetFront|Netfront|Konqueror|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|Opera Mini|iCab|NetNewsWire|ThunderBrowse|Iris|UP\\.Browser|Bunjaloo|Google Earth|Raven for Mac)/(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Bolt|Jasmine|IceCat|Skyfire|Midori|Maxthon|Lynx|Arora|IBrowse|Dillo|Camino|Shiira|Fennec|Phoenix|Chrome|Flock|Netscape|Lunascape|Epiphany|WebPilot|Opera Mini|Opera|Vodafone|NetFront|Netfront|Konqueror|Googlebot|SeaMonkey|Kazehakase|Vienna|Iceape|Iceweasel|IceWeasel|Iron|K-Meleon|Sleipnir|Galeon|GranParadiso|iCab|NetNewsWire|Space Bison|Stainless|Orca|Dolfin|BOLT|Minimo|Tizen Browser|Polaris|Abrowser)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(iRider|Crazy Browser|SkipStone|iCab|Lunascape|Sleipnir|Maemo Browser) (\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(iCab|Lunascape|Opera|Android|Jasmine|Polaris|BREW) (\\d+)\\.(\\d+)\\.?(\\d+)?'
    },
    {
      'regex': '(Android) Donut',
      'v2Replacement': '2',
      'v1Replacement': '1'
    },
    {
      'regex': '(Android) Eclair',
      'v2Replacement': '1',
      'v1Replacement': '2'
    },
    {
      'regex': '(Android) Froyo',
      'v2Replacement': '2',
      'v1Replacement': '2'
    },
    {
      'regex': '(Android) Gingerbread',
      'v2Replacement': '3',
      'v1Replacement': '2'
    },
    {
      'regex': '(Android) Honeycomb',
      'v1Replacement': '3'
    },
    {
      'regex': '(IEMobile)[ /](\\d+)\\.(\\d+)',
      'familyReplacement': 'IE Mobile'
    },
    {
      'regex': '(MSIE) (\\d+)\\.(\\d+).*XBLWP7',
      'familyReplacement': 'IE Large Screen'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Firefox)/(\\d+)\\.(\\d+)(pre|[ab]\\d+[a-z]*)?'
    },
    {
      'regex': '(Obigo)InternetBrowser'
    },
    {
      'regex': '(Obigo)\\-Browser'
    },
    {
      'regex': '(Obigo|OBIGO)[^\\d]*(\\d+)(?:.(\\d+))?'
    },
    {
      'regex': '(MAXTHON|Maxthon) (\\d+)\\.(\\d+)',
      'familyReplacement': 'Maxthon'
    },
    {
      'regex': '(Maxthon|MyIE2|Uzbl|Shiira)',
      'v1Replacement': '0'
    },
    {
      'regex': '(PLAYSTATION) (\\d+)',
      'familyReplacement': 'PlayStation'
    },
    {
      'regex': '(PlayStation Portable)[^\\d]+(\\d+).(\\d+)'
    },
    {
      'regex': '(BrowseX) \\((\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(POLARIS)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Polaris'
    },
    {
      'regex': '(Embider)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Polaris'
    },
    {
      'regex': '(BonEcho)/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Bon Echo'
    },
    {
      'regex': '(iPod).+Version/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPod).*Version/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPhone).*Version/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPhone).*Version/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPad).*Version/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPad).*Version/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPod|iPhone|iPad);.*CPU.*OS (\\d+)(?:_\\d+)?_(\\d+).*Mobile',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(iPod|iPhone|iPad)',
      'familyReplacement': 'Mobile Safari'
    },
    {
      'regex': '(AvantGo) (\\d+).(\\d+)'
    },
    {
      'regex': '(Avant)',
      'v1Replacement': '1'
    },
    {
      'regex': '^(Nokia)',
      'familyReplacement': 'Nokia Services (WAP) Browser'
    },
    {
      'regex': '(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(NokiaBrowser)/(\\d+)\\.(\\d+).(\\d+)'
    },
    {
      'regex': '(NokiaBrowser)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(BrowserNG)/(\\d+)\\.(\\d+).(\\d+)',
      'familyReplacement': 'NokiaBrowser'
    },
    {
      'regex': '(Series60)/5\\.0',
      'v2Replacement': '0',
      'v1Replacement': '7',
      'familyReplacement': 'NokiaBrowser'
    },
    {
      'regex': '(Series60)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Nokia OSS Browser'
    },
    {
      'regex': '(S40OviBrowser)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Nokia Series 40 Ovi Browser'
    },
    {
      'regex': '(Nokia)[EN]?(\\d+)'
    },
    {
      'regex': '(PlayBook).+RIM Tablet OS (\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Blackberry WebKit'
    },
    {
      'regex': '(Black[bB]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)',
      'familyReplacement': 'Blackberry WebKit'
    },
    {
      'regex': '(Black[bB]erry)\\s?(\\d+)',
      'familyReplacement': 'Blackberry'
    },
    {
      'regex': '(OmniWeb)/v(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Blazer)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Palm Blazer'
    },
    {
      'regex': '(Pre)/(\\d+)\\.(\\d+)',
      'familyReplacement': 'Palm Pre'
    },
    {
      'regex': '(Links) \\((\\d+)\\.(\\d+)'
    },
    {
      'regex': '(QtWeb) Internet Browser/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?'
    },
    {
      'regex': '(AppleWebKit)/(\\d+)\\.?(\\d+)?\\+ .* Safari',
      'familyReplacement': 'WebKit Nightly'
    },
    {
      'regex': '(Version)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?.*Safari/',
      'familyReplacement': 'Safari'
    },
    {
      'regex': '(Safari)/\\d+'
    },
    {
      'regex': '(OLPC)/Update(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(OLPC)/Update()\\.(\\d+)',
      'v1Replacement': '0'
    },
    {
      'regex': '(SEMC\\-Browser)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Teleca)',
      'familyReplacement': 'Teleca Browser'
    },
    {
      'regex': '(MSIE) (\\d+)\\.(\\d+)',
      'familyReplacement': 'IE'
    },
    {
      'regex': '(Nintendo 3DS).* Version/(\\d+)\\.(\\d+)(?:\\.(\\w+))'
    }
  ],
  'osParsers': [
    {
      'regex': '(Android) (\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?'
    },
    {
      'regex': '(Android)\\-(\\d+)\\.(\\d+)(?:[.\\-]([a-z0-9]+))?'
    },
    {
      'regex': '(Android) Donut',
      'osV2Replacement': '2',
      'osV1Replacement': '1'
    },
    {
      'regex': '(Android) Eclair',
      'osV2Replacement': '1',
      'osV1Replacement': '2'
    },
    {
      'regex': '(Android) Froyo',
      'osV2Replacement': '2',
      'osV1Replacement': '2'
    },
    {
      'regex': '(Android) Gingerbread',
      'osV2Replacement': '3',
      'osV1Replacement': '2'
    },
    {
      'regex': '(Android) Honeycomb',
      'osV1Replacement': '3'
    },
    {
      'regex': '(Windows Phone 6\\.5)'
    },
    {
      'regex': '(Windows (?:NT 5\\.2|NT 5\\.1))',
      'osReplacement': 'Windows XP'
    },
    {
      'regex': '(XBLWP7)',
      'osReplacement': 'Windows Phone OS'
    },
    {
      'regex': '(Windows NT 6\\.1)',
      'osReplacement': 'Windows 7'
    },
    {
      'regex': '(Windows NT 6\\.0)',
      'osReplacement': 'Windows Vista'
    },
    {
      'regex': '(Windows 98|Windows XP|Windows ME|Windows 95|Windows CE|Windows 7|Windows NT 4\\.0|Windows Vista|Windows 2000)'
    },
    {
      'regex': '(Windows NT 6\\.2)',
      'osReplacement': 'Windows 8'
    },
    {
      'regex': '(Windows NT 5\\.0)',
      'osReplacement': 'Windows 2000'
    },
    {
      'regex': '(Windows Phone OS) (\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Windows ?Mobile)',
      'osReplacement': 'Windows Mobile'
    },
    {
      'regex': '(WinNT4.0)',
      'osReplacement': 'Windows NT 4.0'
    },
    {
      'regex': '(Win98)',
      'osReplacement': 'Windows 98'
    },
    {
      'regex': '(Tizen)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Mac OS X) (\\d+)[_.](\\d+)(?:[_.](\\d+))?'
    },
    {
      'regex': '(?:PPC|Intel) (Mac OS X)'
    },
    {
      'regex': '(CPU OS|iPhone OS) (\\d+)_(\\d+)(?:_(\\d+))?',
      'osReplacement': 'iOS'
    },
    {
      'regex': '(iPhone|iPad|iPod); Opera',
      'osReplacement': 'iOS'
    },
    {
      'regex': '(iPhone|iPad|iPod).*Mac OS X.*Version/(\\d+)\\.(\\d+)',
      'osReplacement': 'iOS'
    },
    {
      'regex': '(CrOS) [a-z0-9_]+ (\\d+)\\.(\\d+)(?:\\.(\\d+))?',
      'osReplacement': 'Chrome OS'
    },
    {
      'regex': '(Debian)-(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?'
    },
    {
      'regex': '(Linux Mint)(?:/(\\d+))?'
    },
    {
      'regex': '(Mandriva)(?: Linux)?/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?'
    },
    {
      'regex': '(Symbian[Oo][Ss])/(\\d+)\\.(\\d+)',
      'osReplacement': 'Symbian OS'
    },
    {
      'regex': '(Symbian/3).+NokiaBrowser/7\\.3',
      'osReplacement': 'Symbian^3 Anna'
    },
    {
      'regex': '(Symbian/3).+NokiaBrowser/7\\.4',
      'osReplacement': 'Symbian^3 Belle'
    },
    {
      'regex': '(Symbian/3)',
      'osReplacement': 'Symbian^3'
    },
    {
      'regex': '(Series 60|SymbOS|S60)',
      'osReplacement': 'Symbian OS'
    },
    {
      'regex': '(MeeGo)'
    },
    {
      'regex': 'Symbian [Oo][Ss]',
      'osReplacement': 'Symbian OS'
    },
    {
      'regex': '(Black[Bb]erry)[0-9a-z]+/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?',
      'osReplacement': 'BlackBerry OS'
    },
    {
      'regex': '(Black[Bb]erry).+Version/(\\d+)\\.(\\d+)\\.(\\d+)(?:\\.(\\d+))?',
      'osReplacement': 'BlackBerry OS'
    },
    {
      'regex': '(RIM Tablet OS) (\\d+)\\.(\\d+)\\.(\\d+)',
      'osReplacement': 'BlackBerry Tablet OS'
    },
    {
      'regex': '(Play[Bb]ook)',
      'osReplacement': 'BlackBerry Tablet OS'
    },
    {
      'regex': '(Black[Bb]erry)',
      'osReplacement': 'Blackberry OS'
    },
    {
      'regex': '(webOS|hpwOS)/(\\d+)\\.(\\d+)(?:\\.(\\d+))?',
      'osReplacement': 'webOS'
    },
    {
      'regex': '(SUSE|Fedora|Red Hat|PCLinuxOS)/(\\d+)\\.(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(SUSE|Fedora|Red Hat|Puppy|PCLinuxOS|CentOS)/(\\d+)\\.(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Ubuntu|Kindle|Bada|Lubuntu|BackTrack|Red Hat|Slackware)/(\\d+)\\.(\\d+)'
    },
    {
      'regex': '(PlayStation Vita) (\\d+)\\.(\\d+)'
    },
    {
      'regex': '(Windows|OpenBSD|FreeBSD|NetBSD|Ubuntu|Kubuntu|Android|Arch Linux|CentOS|WeTab|Slackware)'
    },
    {
      'regex': '(Linux|BSD)'
    }
  ],
  'mobileOSFamilies': [
    'Windows Phone 6.5',
    'Windows CE',
    'Symbian OS'
  ],
  'deviceParsers': [
    {
      'regex': 'HTC ([A-Z][a-z0-9]+) Build',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': 'HTC ([A-Z][a-z0-9 ]+) \\d+\\.\\d+\\.\\d+\\.\\d+',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': 'HTC_Touch_([A-Za-z0-9]+)',
      'deviceReplacement': 'HTC Touch ($1)'
    },
    {
      'regex': 'USCCHTC(\\d+)',
      'deviceReplacement': 'HTC $1 (US Cellular)'
    },
    {
      'regex': 'Sprint APA(9292)',
      'deviceReplacement': 'HTC $1 (Sprint)'
    },
    {
      'regex': 'HTC ([A-Za-z0-9]+ [A-Z])',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': 'HTC-([A-Za-z0-9]+)',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': 'HTC_([A-Za-z0-9]+)',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': 'HTC ([A-Za-z0-9]+)',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': '(ADR[A-Za-z0-9]+)',
      'deviceReplacement': 'HTC $1'
    },
    {
      'regex': '(HTC)'
    },
    {
      'regex': '(SamsungSGHi560)',
      'deviceReplacement': 'Samsung SGHi560'
    },
    {
      'regex': 'SonyEricsson([A-Za-z0-9]+)/',
      'deviceReplacement': 'Ericsson $1'
    },
    {
      'regex': 'Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; WOWMobile (.+) Build'
    },
    {
      'regex': 'Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build'
    },
    {
      'regex': 'Android[\\- ][\\d]+\\.[\\d]+\\-update1\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build'
    },
    {
      'regex': 'Android[\\- ][\\d]+\\.[\\d]+\\; [A-Za-z]{2}\\-[A-Za-z]{2}\\; (.+) Build'
    },
    {
      'regex': 'Android[\\- ][\\d]+\\.[\\d]+\\.[\\d]+; (.+) Build'
    },
    {
      'regex': 'NokiaN([0-9]+)',
      'deviceReplacement': 'Nokia N$1'
    },
    {
      'regex': 'Nokia([A-Za-z0-9\\v-]+)',
      'deviceReplacement': 'Nokia $1'
    },
    {
      'regex': 'NOKIA ([A-Za-z0-9\\-]+)',
      'deviceReplacement': 'Nokia $1'
    },
    {
      'regex': 'Nokia ([A-Za-z0-9\\-]+)',
      'deviceReplacement': 'Nokia $1'
    },
    {
      'regex': 'Lumia ([A-Za-z0-9\\-]+)',
      'deviceReplacement': 'Lumia $1'
    },
    {
      'regex': 'Symbian',
      'deviceReplacement': 'Nokia'
    },
    {
      'regex': '(PlayBook).+RIM Tablet OS',
      'deviceReplacement': 'Blackberry Playbook'
    },
    {
      'regex': '(Black[Bb]erry [0-9]+);'
    },
    {
      'regex': 'Black[Bb]erry([0-9]+)',
      'deviceReplacement': 'BlackBerry $1'
    },
    {
      'regex': '(Pre)/(\\d+)\\.(\\d+)',
      'deviceReplacement': 'Palm Pre'
    },
    {
      'regex': '(Pixi)/(\\d+)\\.(\\d+)',
      'deviceReplacement': 'Palm Pixi'
    },
    {
      'regex': '(Touchpad)/(\\d+)\\.(\\d+)',
      'deviceReplacement': 'HP Touchpad'
    },
    {
      'regex': 'HPiPAQ([A-Za-z0-9]+)/(\\d+).(\\d+)',
      'deviceReplacement': 'HP iPAQ $1'
    },
    {
      'regex': 'Palm([A-Za-z0-9]+)',
      'deviceReplacement': 'Palm $1'
    },
    {
      'regex': 'Treo([A-Za-z0-9]+)',
      'deviceReplacement': 'Palm Treo $1'
    },
    {
      'regex': 'webOS.*(P160UNA)/(\\d+).(\\d+)',
      'deviceReplacement': 'HP Veer'
    },
    {
      'regex': '(PlayStation Portable)'
    },
    {
      'regex': '(PlayStation Vita)'
    },
    {
      'regex': '(Kindle Fire)'
    },
    {
      'regex': '(Kindle)'
    },
    {
      'regex': '(Silk)/(\\d+)\\.(\\d+)(?:\\.([0-9\\-]+))?',
      'deviceReplacement': 'Kindle Fire'
    },
    {
      'regex': '(iPad) Simulator;'
    },
    {
      'regex': '(iPad);'
    },
    {
      'regex': '(iPod);'
    },
    {
      'regex': '(iPhone) Simulator;'
    },
    {
      'regex': '(iPhone);'
    },
    {
      'regex': 'acer_([A-Za-z0-9]+)_',
      'deviceReplacement': 'Acer $1'
    },
    {
      'regex': 'acer_([A-Za-z0-9]+)_',
      'deviceReplacement': 'Acer $1'
    },
    {
      'regex': 'Amoi\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Amoi $1'
    },
    {
      'regex': 'AMOI\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Amoi $1'
    },
    {
      'regex': 'Asus\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Asus $1'
    },
    {
      'regex': 'ASUS\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Asus $1'
    },
    {
      'regex': 'BIRD\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Bird $1'
    },
    {
      'regex': 'BIRD\\.([A-Za-z0-9]+)',
      'deviceReplacement': 'Bird $1'
    },
    {
      'regex': 'BIRD ([A-Za-z0-9]+)',
      'deviceReplacement': 'Bird $1'
    },
    {
      'regex': 'Dell ([A-Za-z0-9]+)',
      'deviceReplacement': 'Dell $1'
    },
    {
      'regex': 'DoCoMo/2\\.0 ([A-Za-z0-9]+)',
      'deviceReplacement': 'DoCoMo $1'
    },
    {
      'regex': '([A-Za-z0-9]+)\\_W\\;FOMA',
      'deviceReplacement': 'DoCoMo $1'
    },
    {
      'regex': '([A-Za-z0-9]+)\\;FOMA',
      'deviceReplacement': 'DoCoMo $1'
    },
    {
      'regex': 'vodafone([A-Za-z0-9]+)',
      'deviceReplacement': 'Huawei Vodafone $1'
    },
    {
      'regex': 'i\\-mate ([A-Za-z0-9]+)',
      'deviceReplacement': 'i-mate $1'
    },
    {
      'regex': 'Kyocera\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Kyocera $1'
    },
    {
      'regex': 'KWC\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Kyocera $1'
    },
    {
      'regex': 'Lenovo\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Lenovo $1'
    },
    {
      'regex': 'Lenovo\\_([A-Za-z0-9]+)',
      'deviceReplacement': 'Lenovo $1'
    },
    {
      'regex': 'LG/([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LG-LG([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LGE-LG([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LGE VX([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LG ([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LGE LG\\-AX([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LG\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LGE\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': 'LG([A-Za-z0-9]+)',
      'deviceReplacement': 'LG $1'
    },
    {
      'regex': '(KIN)\\.One (\\d+)\\.(\\d+)',
      'deviceReplacement': 'Microsoft $1'
    },
    {
      'regex': '(KIN)\\.Two (\\d+)\\.(\\d+)',
      'deviceReplacement': 'Microsoft $1'
    },
    {
      'regex': '(Motorola)\\-([A-Za-z0-9]+)'
    },
    {
      'regex': 'MOTO\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Motorola $1'
    },
    {
      'regex': 'MOT\\-([A-Za-z0-9]+)',
      'deviceReplacement': 'Motorola $1'
    },
    {
      'regex': 'Philips([A-Za-z0-9]+)',
      'deviceReplacement': 'Philips $1'
    },
    {
      'regex': 'Philips ([A-Za-z0-9]+)',
      'deviceReplacement': 'Philips $1'
    },
    {
      'regex': 'SAMSUNG-([A-Za-z0-9\\-]+)',
      'deviceReplacement': 'Samsung $1'
    },
    {
      'regex': 'SAMSUNG\\; ([A-Za-z0-9\\-]+)',
      'deviceReplacement': 'Samsung $1'
    },
    {
      'regex': 'Softbank/1\\.0/([A-Za-z0-9]+)',
      'deviceReplacement': 'Softbank $1'
    },
    {
      'regex': 'Softbank/2\\.0/([A-Za-z0-9]+)',
      'deviceReplacement': 'Softbank $1'
    },
    {
      'regex': '(hiptop|avantgo|plucker|xiino|blazer|elaine|up.browser|up.link|mmp|smartphone|midp|wap|vodafone|o2|pocket|mobile|pda)',
      'deviceReplacement': 'Generic Smartphone'
    },
    {
      'regex': '^(1207|3gso|4thp|501i|502i|503i|504i|505i|506i|6310|6590|770s|802s|a wa|acer|acs\\-|airn|alav|asus|attw|au\\-m|aur |aus |abac|acoo|aiko|alco|alca|amoi|anex|anny|anyw|aptu|arch|argo|bell|bird|bw\\-n|bw\\-u|beck|benq|bilb|blac|c55/|cdm\\-|chtm|capi|comp|cond|craw|dall|dbte|dc\\-s|dica|ds\\-d|ds12|dait|devi|dmob|doco|dopo|el49|erk0|esl8|ez40|ez60|ez70|ezos|ezze|elai|emul|eric|ezwa|fake|fly\\-|fly\\_|g\\-mo|g1 u|g560|gf\\-5|grun|gene|go.w|good|grad|hcit|hd\\-m|hd\\-p|hd\\-t|hei\\-|hp i|hpip|hs\\-c|htc |htc\\-|htca|htcg)',
      'deviceReplacement': 'Generic Feature Phone'
    },
    {
      'regex': '^(htcp|htcs|htct|htc\\_|haie|hita|huaw|hutc|i\\-20|i\\-go|i\\-ma|i230|iac|iac\\-|iac/|ig01|im1k|inno|iris|jata|java|kddi|kgt|kgt/|kpt |kwc\\-|klon|lexi|lg g|lg\\-a|lg\\-b|lg\\-c|lg\\-d|lg\\-f|lg\\-g|lg\\-k|lg\\-l|lg\\-m|lg\\-o|lg\\-p|lg\\-s|lg\\-t|lg\\-u|lg\\-w|lg/k|lg/l|lg/u|lg50|lg54|lge\\-|lge/|lynx|leno|m1\\-w|m3ga|m50/|maui|mc01|mc21|mcca|medi|meri|mio8|mioa|mo01|mo02|mode|modo|mot |mot\\-|mt50|mtp1|mtv |mate|maxo|merc|mits|mobi|motv|mozz|n100|n101|n102|n202|n203|n300|n302|n500|n502|n505|n700|n701|n710|nec\\-|nem\\-|newg|neon)',
      'deviceReplacement': 'Generic Feature Phone'
    },
    {
      'regex': '^(netf|noki|nzph|o2 x|o2\\-x|opwv|owg1|opti|oran|ot\\-s|p800|pand|pg\\-1|pg\\-2|pg\\-3|pg\\-6|pg\\-8|pg\\-c|pg13|phil|pn\\-2|pt\\-g|palm|pana|pire|pock|pose|psio|qa\\-a|qc\\-2|qc\\-3|qc\\-5|qc\\-7|qc07|qc12|qc21|qc32|qc60|qci\\-|qwap|qtek|r380|r600|raks|rim9|rove|s55/|sage|sams|sc01|sch\\-|scp\\-|sdk/|se47|sec\\-|sec0|sec1|semc|sgh\\-|shar|sie\\-|sk\\-0|sl45|slid|smb3|smt5|sp01|sph\\-|spv |spv\\-|sy01|samm|sany|sava|scoo|send|siem|smar|smit|soft|sony|t\\-mo|t218|t250|t600|t610|t618|tcl\\-|tdg\\-|telm|tim\\-|ts70|tsm\\-|tsm3|tsm5|tx\\-9|tagt)',
      'deviceReplacement': 'Generic Feature Phone'
    },
    {
      'regex': '^(talk|teli|topl|tosh|up.b|upg1|utst|v400|v750|veri|vk\\-v|vk40|vk50|vk52|vk53|vm40|vx98|virg|vite|voda|vulc|w3c |w3c\\-|wapj|wapp|wapu|wapm|wig |wapi|wapr|wapv|wapy|wapa|waps|wapt|winc|winw|wonu|x700|xda2|xdag|yas\\-|your|zte\\-|zeto|aste|audi|avan|blaz|brew|brvw|bumb|ccwa|cell|cldc|cmd\\-|dang|eml2|fetc|hipt|http|ibro|idea|ikom|ipaq|jbro|jemu|jigs|keji|kyoc|kyok|libw|m\\-cr|midp|mmef|moto|mwbp|mywa|newt|nok6|o2im|pant|pdxg|play|pluc|port|prox|rozo|sama|seri|smal|symb|treo|upsi|vx52|vx53|vx60|vx61|vx70|vx80|vx81|vx83|vx85|wap\\-|webc|whit|wmlb|xda\\-|xda\\_)',
      'deviceReplacement': 'Generic Feature Phone'
    },
    {
      'regex': '(bot|borg|google(^tv)|yahoo|slurp|msnbot|msrbot|openbot|archiver|netresearch|lycos|scooter|altavista|teoma|gigabot|baiduspider|blitzbot|oegp|charlotte|furlbot|http%20client|polybot|htdig|ichiro|mogimogi|larbin|pompos|scrubby|searchsight|seekbot|semanticdiscovery|silk|snappy|speedy|spider|voila|vortex|voyager|zao|zeal|fast\\-webcrawler|converacrawler|dataparksearch|findlinks)',
      'deviceReplacement': 'Spider'
    }
  ],
  'mobileUserAgentFamilies': [
    'Firefox Mobile',
    'Opera Mobile',
    'Opera Mini',
    'Mobile Safari',
    'webOS',
    'IE Mobile',
    'Playstation Portable',
    'Nokia',
    'Blackberry',
    'Palm',
    'Silk',
    'Android',
    'Maemo',
    'Obigo',
    'Netfront',
    'AvantGo',
    'Teleca',
    'SEMC-Browser',
    'Bolt',
    'Iris',
    'UP.Browser',
    'Symphony',
    'Minimo',
    'Bunjaloo',
    'Jasmine',
    'Dolfin',
    'Polaris',
    'BREW',
    'Chrome Mobile',
    'UC Browser',
    'Tizen Browser'
  ]
};


/**
 * Function to loop through our big array or one provided externally to the
 * function and compare each regex to the user agent being reported by the
 * user's browser. Then return what browser matches.
 * @param {array} regexArray is an array of regexes.
 * @return {string} Browser name that matches the regex of the user agent.
 */
ww.userAgent.getBrowserName = function(regexArray) {

  if (regexArray) {
    browserData = regexArray;
  }

  for (var i = 0; i < browserData['userAgentParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['userAgentParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    // If the regex value matches the user agent, create a string to return.
    if (browserMatch) {

      /**
       * If the UA doesn't report a proper browser name, use the replacement
       * from our browserData array.
       */
      if (browserData['userAgentParsers'][i]['familyReplacement']) {
        var browserName =
            browserData['userAgentParsers'][i]['familyReplacement'];

      // If the UA provides all the default data then create the string from it.
      } else {
        var browserName = browserMatch[1];
      }

      return browserName;
    }

  }

};

goog.exportSymbol('ww.userAgent.getBrowserName', ww.userAgent.getBrowserName);

/**
 * Function to loop through our big array or one provided externally to the
 * function and compare each regex to the user agent being reported by the
 * user's browser. Then return what browser version matches.
 * @param {array} regexArray is an array of regexes.
 * @return {string} Browser version that matches the regex of the user agent.
 */
ww.userAgent.getBrowserV = function(regexArray) {

  if (regexArray) {
    browserData = regexArray;
  }

  for (var i = 0; i < browserData['userAgentParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['userAgentParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    // If the regex value matches the user agent, create a string to return.
    if (browserMatch) {
      /**
       * If the UA doesn't report a proper browser version, use the replacement
       * from our browserData array.
       */
      if (browserData['userAgentParsers'][i]['v1Replacement']) {
        var browserVersion =
          browserData['userAgentParsers'][i]['v1Replacement'];

        // If there is a browser subversion replacement, add it to our string.
        if (browserData['userAgentParsers'][i]['v2Replacement']) {
          browserVersion +=
            '.' + browserData['userAgentParsers'][i]['v2Replacement'];
        }

      // If the UA provides all the default data then create the string from it.
      } else {
        var browserVersion = browserMatch[2];
      }

      return browserVersion;
    }

  }

};

goog.exportSymbol('ww.userAgent.getBrowserV', ww.userAgent.getBrowserV);


/**
 * Function to loop through our big array or one provided externally to the
 * function and compare each regex to the user agent being reported by the
 * user's browser. Then return what OS matches.
 * @param {array} regexArray is an array of regexes.
 * @return {string} The OS name that matches the regex of the user agent.
 */
ww.userAgent.getOS = function(regexArray) {

  if (regexArray) {
    browserData = regexArray;
  }

  for (var i = 0; i < browserData['osParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['osParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    // If the regex value matches the user agent, create a string to return.
    if (browserMatch) {

      /**
       * If the UA doesn't report a proper OS name, use the replacement
       * from our browserData array.
       */
      if (browserData['osParsers'][i]['osReplacement']) {
        var OS = browserData['osParsers'][i]['osReplacement'];

      // If the UA provides all the default data then create the string from it.
      } else {
        var OS = browserMatch[1];
      }

      return OS;
    }

  }

};

goog.exportSymbol('ww.userAgent.getOS', ww.userAgent.getOS);


/**
 * Function to loop through our big array or one provided externally to the
 * function and compare each regex to the user agent being reported by the
 * user's browser. Then return what OS version matches.
 * @param {array} regexArray is an array of regexes.
 * @return {string} The OS Version that matches the regex of the user agent.
 */
ww.userAgent.getOSV = function(regexArray) {

  if (regexArray) {
    browserData = regexArray;
  }

  for (var i = 0; i < browserData['osParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['osParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    // If the regex value matches the user agent, create a string to return.
    if (browserMatch) {

      /**
       * If the UA doesn't report a proper OS version, use the replacement
       * from our browserData array.
       */
      if (browserData['osParsers'][i]['osV1Replacement']) {
        var osVersion = browserData['osParsers'][i]['osV1Replacement'];

        // If there is a browser subversion replacement, add it to our string.
        if (browserData['osParsers'][i]['osV2Replacement']) {
          osVersion +=
            '.' + browserData['osParsers'][i]['osV2Replacement'];
        }

      // If the UA provides all the default data then create the string from it.
      } else {
        var osVersion = '';
        if (browserMatch[2]) {
          osVersion += browserMatch[2];
        }
        if (browserMatch[3]) {
          osVersion += '.' + browserMatch[3];
        }
        if (browserMatch[4]) {
          osVersion += '.' + browserMatch[4];
        }
      }

      return osVersion;
    }

  }

};

goog.exportSymbol('ww.userAgent.getOSV', ww.userAgent.getOSV);


/**
 * Function to report back if the detected user agent is a mobile device
 * @param {array} regexArray is an array of regexes.
 * @return {boolean} Returns true if a mobile device matches the user agent.
 */

ww.userAgent.isMobile = function(regexArray) {

  if (regexArray) {
    browserData = regexArray;
  }

  for (var i = 0; i < browserData['deviceParsers'].length; i++) {

    // Get the regex value of the current index and make a regex object from it.
    var currentItem =
      new RegExp(browserData['deviceParsers'][i]['regex']);

    // Check the string of the user agent against our current regex value.
    var browserMatch = currentItem.exec(navigator.userAgent);

    if (browserMatch) {
      return true;
    }
  }

};

goog.exportSymbol('ww.userAgent.isMobile', ww.userAgent.isMobile);