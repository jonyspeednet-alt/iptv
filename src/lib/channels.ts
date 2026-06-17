export interface Channel {
  id: number;
  name: string;
  logo: string;
  url: string;
  category: string;
  language?: string;
  country?: string;
  fallbackUrls?: string[];
}

export const defaultChannels: Channel[] = [
  // ===== Bangla News =====
  { id: 1, name: "R Plus News", logo: "https://rplus.in/wp-content/uploads/2025/06/RPLUS_NEWS.png", url: "https://thelegitpro.in/pntv/rplusnews24x7/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 2, name: "Channel 24", logo: "https://yt3.googleusercontent.com/8Q8MCd6ypr2Hzbp60VE_stJPl063kQYfeTxdIQkAXRfhdzxByLl0sJYHsk43uTM4W_cOzwcbPQ=s160-c-k-c0x00ffffff-no-rj", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1703/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 3, name: "Jamuna TV", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Jamuna_TV_logo.svg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1701/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 4, name: "Independent TV", logo: "https://static.wikia.nocookie.net/etv-gspn-bangla/images/b/bb/Independent_logo_2011.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1704/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 5, name: "Somoy News", logo: "https://static.wikia.nocookie.net/logopedia/images/8/8e/Somoy_Television.svg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1702/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 6, name: "ATN News", logo: "https://static.wikia.nocookie.net/etv-gspn-bangla/images/4/4d/ATN_News_HD.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1706/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 7, name: "DBC News", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/DBC%20News.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1728/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 8, name: "Star News", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/refs/heads/main/Star%20News.jpg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1710/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 9, name: "Ekattor TV", logo: "https://static.wikia.nocookie.net/logopedia/images/5/5d/Ekattor_TV_logo.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1705/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },
  { id: 10, name: "News 24", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/News%2024.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1708/output/index.m3u8", category: "Bangla News", language: "Bengali", country: "Bangladesh" },

  // ===== Bangla TV =====
  { id: 11, name: "SATV", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/SATV.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1720/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 12, name: "Channel i", logo: "https://static.wikia.nocookie.net/logopedia/images/9/9d/Channel_i_HD_logo_2021.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1723/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 13, name: "NTV HD", logo: "https://static.wikia.nocookie.net/logopedia/images/e/e1/NTV_Bangladesh.svg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1716/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 14, name: "ATN Bangla", logo: "https://static.wikia.nocookie.net/logopedia/images/2/2e/ATN_Bangla.svg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1722/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 15, name: "Maasranga TV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Maasranga_Television_Logo.svg/200px-Maasranga_Television_Logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1711/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 16, name: "Bangla Vision", logo: "https://www.bvnews24.com/media/common/newbvlogo.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1715/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 17, name: "BTV HD", logo: "https://static.wikia.nocookie.net/logopedia/images/1/12/BTV_HD_Logo.svg", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1709/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 18, name: "Channel 9", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Channel%209.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1729/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 19, name: "BTV Sangsad", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/BTV_Sangsad_logo.svg/200px-BTV_Sangsad_logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1713/output/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 20, name: "Desh TV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Desh_TV_logo.svg/200px-Desh_TV_logo.svg.png", url: "https://bozztv.com/rongo/rongo-DeshTV/tracks-v1a1/mono.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 21, name: "Deepto TV", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Deepto_TV_logo.svg/200px-Deepto_TV_logo.svg.png", url: "https://byphdgllyk.gpcdn.net/hls/deeptotv/0_1/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },

  // ===== Indian =====
  { id: 22, name: "TV9 Bangla", logo: "https://images.tv9bangla.com/wp-content/themes/tv9bangla/images/tv9-bangla-logo.svg", url: "https://dyjmyiv3bp2ez.cloudfront.net/pub-iotv9banaen8yq/liveabr/playlist.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 23, name: "Zee 24 Ghanta", logo: "https://static.wikia.nocookie.net/logopedia/images/b/bc/Zee_24_Ghanta_2025_Logo_2025.png", url: "https://d2dsoyvkr33m05.cloudfront.net/index_1.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 24, name: "DD Bangla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/DD_Bangla_logo.svg/200px-DD_Bangla_logo.svg.png", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/7ff57cc9046b4c188b51a0d506f36e7f/index_3.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 25, name: "Calcutta News", logo: "https://assets.calcuttatelevisionnetwork.in/cn.png", url: "https://akdnetwork.co.in/live/cnnew/index.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 26, name: "Kolkata TV", logo: "https://a.jsrdn.com/hls/23215/kolkata-tv/logo_20250819_185012_70.png", url: "https://cdn.ottlive.co.in/kolkatatv/index.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 27, name: "Republic Bangla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Republic_Bangla_logo.svg/200px-Republic_Bangla_logo.svg.png", url: "https://vg-republictvyupp.akamaized.net/ptnr-yuppt/v1/manifest/611d79b11b77e2f571934fd80ca1413453772ac7/vglive-sk-613605/93d674ab-f7a0-404e-88b2-b4f163373dbe/0.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 28, name: "High News", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/High_News_logo.svg/200px-High_News_logo.svg.png", url: "http://highmedia.livebox.co.in:80/HIGHNEWShls/LIVE.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 29, name: "ABP Ananda", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/ABP_Ananda_logo.svg/200px-ABP_Ananda_logo.svg.png", url: "https://amg01448-samsungin-abpananda-samsungin-ad-pw.amagi.tv/playlist/amg01448-samsungin-abpananda-samsungin/playlist.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 30, name: "News18 Bangla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/News18_Bangla_logo.svg/200px-News18_Bangla_logo.svg.png", url: "https://amg01448-samsungin-news18bangla-samsungin-ad-qy.amagi.tv/ts-eu-w1-n2/playlist/amg01448-samsungin-news18bangla-samsungin/playlist.m3u8", category: "Indian", language: "Bengali", country: "India" },

  // ===== Sports =====
  { id: 31, name: "T Sports", logo: "", url: "http://198.195.239.50:8095/tsports/tracks-v1a1/mono.m3u8", fallbackUrls: ["http://113.21.231.219:789/Tsports/index.m3u8"], category: "Sports", language: "Bengali", country: "Bangladesh" },
  { id: 32, name: "DD Sports", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/DD_Sports_logo.svg/200px-DD_Sports_logo.svg.png", url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index_3.m3u8", category: "Sports", language: "Hindi", country: "India" },
  { id: 33, name: "CazeTV - WC 2026", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Caze_TV_logo.svg/200px-Caze_TV_logo.svg.png", url: "https://dfr80qz435crc.cloudfront.net/MNOP/Amagi/Caze/Caze_TV_BR/Caze_TV.m3u8", category: "Sports", language: "Portuguese", country: "Brazil" },
  { id: 34, name: "beIN Sports XTRA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/BeIN_Sports_Xtra_logo.svg/200px-BeIN_Sports_Xtra_logo.svg.png", url: "https://bein-xtra-bein.amagi.tv/playlist.m3u8", category: "Sports", language: "English", country: "USA" },
  { id: 35, name: "FIFA+ USA", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/FIFA%2B_%282025%29.svg/960px-FIFA%2B_%282025%29.svg.png", url: "https://d2w9q46ikgrcwx.cloudfront.net/v1/master/3722c60a815c199d9c0ef36c5b73da68a62b09d1/cc-of5cbk3sav3w5/v1/sysdata_s_p_a_fifa_7/samsungheadend_us/latest/main/hls/playlist.m3u8", category: "Sports", language: "English", country: "USA" },
  { id: 36, name: "FIFA+ English", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/FIFA%2B_%282025%29.svg/960px-FIFA%2B_%282025%29.svg.png", url: "https://a62dad94.wurl.com/master/f36d25e7e52f1ba8d7e56eb859c636563214f541/UmFrdXRlblRWLWV1X0ZJRkFQbHVzRW5nbGlzaF9ITFM/playlist.m3u8", category: "Sports", language: "English", country: "International" },

  // ===== Music =====
  { id: 37, name: "Sangeet Bangla", logo: "https://static.wikia.nocookie.net/logopedia/images/d/da/Sangeet_Bangla_logo_2006.png", url: "https://cdn-4.pishow.tv/live/1143/master.m3u8", category: "Music", language: "Bengali", country: "India" },
  { id: 38, name: "Orange Bangla TV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Orange_Bangla_TV_logo.svg/200px-Orange_Bangla_TV_logo.svg.png", url: "https://cdn-4.pishow.tv/live/1499/master.m3u8", category: "Music", language: "Bengali", country: "Bangladesh" },
  { id: 39, name: "ATN Music", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/ATN_Music_TV_logo.svg/200px-ATN_Music_TV_logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1717/output/index.m3u8", category: "Music", language: "Bengali", country: "Bangladesh" },

  // ===== International =====
  { id: 40, name: "Al Jazeera", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Aljazeera_eng.svg/200px-Aljazeera_eng.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1721/output/index.m3u8", category: "International", language: "English", country: "Qatar" },
  { id: 41, name: "TBN 24 USA", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/TBN24.png", url: "http://cdn01.palki.tv/live/TBN24-M/index.m3u8", category: "International", language: "Bengali", country: "USA" },
  { id: 42, name: "France 24", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/France_24_logo.svg/200px-France_24_logo.svg.png", url: "https://live.france24.com/hls/live/2037218/F24_EN_HI_HLS/master_900.m3u8", category: "International", language: "English", country: "France" },
  { id: 43, name: "DW English", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Deutsche_Welle_symbol_2012.svg/200px-Deutsche_Welle_symbol_2012.svg.png", url: "https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/index.m3u8", category: "International", language: "English", country: "Germany" },

  // ===== Kids =====
  { id: 44, name: "Baby TV", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/BabyTV_logo.svg/200px-BabyTV_logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1726/output/index.m3u8", category: "Kids", language: "English", country: "International" },

  // ===== Religious =====
  { id: 45, name: "Peacetv Bangla", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Peace_TV_Bangla_logo.svg/200px-Peace_TV_Bangla_logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1727/output/index.m3u8", category: "Religious", language: "Bengali", country: "Bangladesh" },
  { id: 46, name: "Quran TV", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Saudi_Quran_TV_logo.svg/200px-Saudi_Quran_TV_logo.svg.png", url: "https://owrcovcrpy.gpcdn.net/bpk-tv/1730/output/index.m3u8", category: "Religious", language: "Arabic", country: "Saudi Arabia" },

  // ===== New Bangla TV =====
  { id: 49, name: "RTV", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/RTV.png", url: "https://bozztv.com/rongo/rongo-RTV/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 50, name: "Boishakhi TV", logo: "", url: "https://boishakhi.sonarbanglatv.com/boishakhi/boishakhitv/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 51, name: "Ekushey TV", logo: "https://i.postimg.cc/C15wr1RW/Ekushey-Television-Logo-svg.png", url: "https://ekusheyserver.com/hls-live/livepkgr/_definst_/liveevent/livestream3.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 52, name: "AAKASH AATH", logo: "", url: "https://cdn-4.pishow.tv/live/969/master.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 53, name: "Asian TV", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Asian%20Tv.png", url: "https://mtlivestream.com/hls/asian/ytlive/index.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 54, name: "Enter10 Bangla", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ea/Enterr10_Bangla.jpeg/200px-Enterr10_Bangla.jpeg", url: "https://amg01448-samsungin-enterr10bangla-samsungin-ad-gg.amagi.tv/playlist/amg01448-samsungin-enterr10bangla-samsungin/playlist.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 55, name: "R Plus Gold", logo: "", url: "https://cdn-4.pishow.tv/live/1231/1231_1.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 56, name: "Bangla Movies", logo: "", url: "https://live-stream.utkalbongo.com/hls/livebanglatvstream.m3u8", category: "Bangla TV", language: "Bengali", country: "Bangladesh" },
  { id: 57, name: "Star Jalsha HD", logo: "https://i.postimg.cc/1tmcNHW3/Star-Jalsha-HD.jpg", url: "https://iptvcable.netlify.app/Altogether-007/Kolkata/StarJalsha.m3u8", category: "Indian", language: "Bengali", country: "India" },
  { id: 58, name: "Colors Bangla HD", logo: "https://raw.githubusercontent.com/subirkumarpaul/Logo/main/Colors%20Bangla.png", url: "https://catchup.yuppcdn.net/amazonv2/36/preview/colorsbanglahd/master/chunklist.m3u8", category: "Indian", language: "Bengali", country: "India" },

  // ===== Test =====
  { id: 47, name: "Big Buck Bunny (Test)", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Big_buck_bunny_poster_big.jpg/220px-Big_buck_bunny_poster_big.jpg", url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8", category: "Test", language: "English", country: "International" },
  { id: 48, name: "Apple BipBop (Test)", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/200px-Apple_logo_grey.svg.png", url: "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8", category: "Test", language: "English", country: "International" },
];

export const categories = [
  "All",
  "Favorites",
  "Bangla News",
  "Bangla TV",
  "Indian",
  "Sports",
  "Music",
  "International",
  "Kids",
  "Religious",
  "Test",
] as const;

export type Category = (typeof categories)[number];
