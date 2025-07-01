import { TabDataTypes, PointColor } from "./types";
import { Music, Theater, Building, Sparkles } from "lucide-react";

export const TimelineData: TabDataTypes[] = [
  {
    id: "arena",
    title: "アリーナ",
    icon: Theater,
    stats: {
      sessions: "9本",
      attendees: "未定",
      duration: "各25分"
    },
    entries: [
      {
        startTime: "4:25",
        endTime: "23:59",
        title: "Another World Assemble",
        description: "3年A組 - 誰も見たことのないショーを開催。世界中の特徴豊かな人たちが集まる",
        labels: ["高校3年", "7/5"],
        location: "アリーナ",
        pointColor: "point_1" as PointColor,
        date: "7/1",
        classroom: "3年A組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "4:20",
        endTime: "23:59",
        title: "土曜日のマサミタウン",
        description: "3年B組 - 生徒たちが自分だけが信じる\"説\"をプレゼン。VTRとスタジオで検証",
        labels: ["高校3年", "7/5"],
        location: "アリーナ",
        pointColor: "point_2" as PointColor,
        date: "7/1",
        classroom: "3年B組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:15",
        endTime: "12:40",
        title: "GEKIJO",
        description: "3年F組 - 一世を風靡したお笑いコンビにFTVが密着！すれ違った二人はコンビを再結成できるのか",
        labels: ["高校3年", "7/5"],
        location: "アリーナ",
        pointColor: "point_3" as PointColor,
        date: "7/5",
        classroom: "3年F組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:10",
        endTime: "13:35",
        title: "受け取った施律",
        description: "3年G組 - 戦火の時代に音楽で繋った若者たちの深く結ばれた絆と、過去と現在をつなぐ音楽",
        labels: ["高校3年", "7/5"],
        location: "アリーナ",
        pointColor: "point_4" as PointColor,
        date: "7/5",
        classroom: "3年G組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "10:00",
        endTime: "10:25",
        title: "龍と舞",
        description: "3年E組 - 時は紀元前…オドリ族の美しい踊りによって人々の平和は保たれていた",
        labels: ["高校3年", "7/6"],
        location: "アリーナ",
        pointColor: "point_5" as PointColor,
        date: "7/6",
        classroom: "3年E組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "10:55",
        endTime: "11:20",
        title: "ワープスリップヒーローズ！",
        description: "3年H組 - 立命祭実行委員の5人が立命祭からの帰りに慶祥の校舎が爆発するのを目撃",
        labels: ["高校3年", "7/6"],
        location: "アリーナ",
        pointColor: "point_6" as PointColor,
        date: "7/6",
        classroom: "3年H組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:50",
        endTime: "12:15",
        title: "３D（Three Dimension）",
        description: "3年D組 - 20人しかいないクラスが、舞台の上で不可能を可能に変える",
        labels: ["高校3年", "7/6"],
        location: "アリーナ",
        pointColor: "point_1" as PointColor,
        date: "7/6",
        classroom: "3年D組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:45",
        endTime: "13:10",
        title: "三万年後の光",
        description: "3年I組 - 立命祭当日、3年I組の教室で机に向かう生徒たち。彼らの壮大なトリップが始まる",
        labels: ["高校3年", "7/6"],
        location: "アリーナ",
        pointColor: "point_2" as PointColor,
        date: "7/6",
        classroom: "3年I組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:40",
        endTime: "14:05",
        title: "羽ばたけ Crew'Z",
        description: "3年C組 - 「男子がチア？」偏見に立ち向かい、「やりたい」という気持ちに正直に男子チアを始めたメンバーたち",
        labels: ["高校3年", "7/6"],
        location: "アリーナ",
        pointColor: "point_3" as PointColor,
        date: "7/6",
        classroom: "3年C組",
        pr: undefined,
        poster: undefined
      }
    ]
  },
  {
    id: "sub-arena",
    title: "サブアリーナ",
    icon: Music,
    stats: {
      sessions: "5本",
      attendees: "未定",
      duration: "各15分"
    },
    entries: [
      {
        startTime: "10:25",
        endTime: "10:40",
        title: "2年6組",
        description: "個性の歯車 - １人では力を発揮することはできないが、みなが集まれば大きな歯車のように大きな力を発揮することができる",
        labels: ["中学2年"],
        location: "サブアリーナ",
        pointColor: "point_1" as PointColor,
        date: "7/5",
        classroom: "2年6組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:05",
        endTime: "11:20",
        title: "2年2組",
        description: "去年より全力で協調性を磨き自分たちの最大限の成果を発揮している姿をみせる",
        labels: ["中学2年"],
        location: "サブアリーナ",
        pointColor: "point_2" as PointColor,
        date: "7/5",
        classroom: "2年2組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:45",
        endTime: "12:00",
        title: "2年1組",
        description: "不可能を可能に－主体性をもった挑戦－",
        labels: ["中学2年"],
        location: "サブアリーナ",
        pointColor: "point_3" as PointColor,
        date: "7/5",
        classroom: "2年1組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:25",
        endTime: "12:40",
        title: "2年4組",
        description: "みんなで団結して努力して成長できるという価値。みんなで協力し、努力した結果、成長を感じてもらえる時間にしたい",
        labels: ["中学2年"],
        location: "サブアリーナ",
        pointColor: "point_4" as PointColor,
        date: "7/5",
        classroom: "2年4組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:05",
        endTime: "13:20",
        title: "2年3組",
        description: "個人を尊重し団結するという理念を大切にし、来場者の方々にクラスの統一感や情熱というメッセージを届けたい",
        labels: ["中学2年"],
        location: "サブアリーナ",
        pointColor: "point_5" as PointColor,
        date: "7/5",
        classroom: "2年3組",
        pr: undefined,
        poster: undefined
      }
    ]
  },
  {
    id: "co-tan",
    title: "コタン",
    icon: Sparkles,
    stats: {
      sessions: "9本",
      attendees: "未定",
      duration: "各20分"
    },
    entries: [
      {
        startTime: "10:00",
        endTime: "10:20",
        title: "School R ステ LIVE2025 inRits",
        description: "2年D組 - 某有名TikTokerがMCとしてスペシャル登場！ダンスとMCのコラボレーション",
        labels: ["高校2年", "7/5"],
        location: "Co-tan",
        pointColor: "point_1" as PointColor,
        date: "7/5",
        classroom: "2年D組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "10:55",
        endTime: "11:15",
        title: "夢、かおる",
        description: "2年I組 - 幼馴染のカオルが死んだ日。誰も知らない真実。カオルが死んだのは、俺のせいだ",
        labels: ["高校2年", "7/5"],
        location: "Co-tan",
        pointColor: "point_2" as PointColor,
        date: "7/5",
        classroom: "2年I組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:50",
        endTime: "12:10",
        title: "左回りの時計",
        description: "2年H組 - 昨日の寂しさにさようならを言うために、あの夏を繰り返す。観客参加型、2人の青春を描いた本格ミステリー",
        labels: ["高校2年", "7/5"],
        location: "Co-tan",
        pointColor: "point_3" as PointColor,
        date: "7/5",
        classroom: "2年H組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:45",
        endTime: "13:05",
        title: "流星の宛先",
        description: "2年A組 - 「じゃあどんなに先でも、また４人でこの丘に集まって流れ星みような。」高校生らしいリアルな悩み",
        labels: ["高校2年", "7/5"],
        location: "Co-tan",
        pointColor: "point_4" as PointColor,
        date: "7/5",
        classroom: "2年A組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:40",
        endTime: "14:00",
        title: "あなたのために ～カネハララボアイドルオーディション～",
        description: "2年E組 - 今年の立命祭で1番熱い、ガチンコアイドルオーディション開幕！",
        labels: ["高校2年", "7/5"],
        location: "Co-tan",
        pointColor: "point_5" as PointColor,
        date: "7/5",
        classroom: "2年E組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "10:30",
        endTime: "10:50",
        title: "未来に届け、この叫び",
        description: "2年G組 - 1970年、万博に訪れた高校生４人が時空を越えた体験をする",
        labels: ["高校2年", "7/6"],
        location: "Co-tan",
        pointColor: "point_6" as PointColor,
        date: "7/6",
        classroom: "2年G組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:25",
        endTime: "11:45",
        title: "喧騒ダンスバトル",
        description: "2年C組 - みなさんには今からこの教室を取りあってもらいます。この勝負に決着をつけるのはあなたです！",
        labels: ["高校2年", "7/6"],
        location: "Co-tan",
        pointColor: "point_1" as PointColor,
        date: "7/6",
        classroom: "2年C組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:20",
        endTime: "12:40",
        title: "２GT ～2F Got Talent～",
        description: "2年F組 - 夢を叫べ。2-Fが送る最強のエンターテイメントショー！栄冠は誰の手に",
        labels: ["高校2年", "7/6"],
        location: "Co-tan",
        pointColor: "point_2" as PointColor,
        date: "7/6",
        classroom: "2年F組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:15",
        endTime: "13:35",
        title: "あなたは何流？一般人格付けチェック in KEISHO",
        description: "2年B組 - あなたのセンスが試される！\"本物\"を見抜く力を問う絵画・食べ物・演技・部活",
        labels: ["高校2年", "7/6"],
        location: "Co-tan",
        pointColor: "point_3" as PointColor,
        date: "7/6",
        classroom: "2年B組",
        pr: undefined,
        poster: undefined
      }
    ]
  },
  {
    id: "assembly",
    title: "アッセンブリー",
    icon: Building,
    stats: {
      sessions: "6本",
      attendees: "未定",
      duration: "各25分"
    },
    entries: [
      {
        startTime: "10:00",
        endTime: "10:25",
        title: "3年1組",
        description: "個性があって最終的に良いものを作れる。１組のおもしろさ、新しいことにチャレンジする価値、仲の良さや団結力",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_1" as PointColor,
        date: "7/5",
        classroom: "3年1組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "10:40",
        endTime: "11:05",
        title: "3年2組",
        description: "笑えて、仲間の大切さに気づけて、親も子も感動を通して、個性を尊重を伝える",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_2" as PointColor,
        date: "7/5",
        classroom: "3年2組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "11:20",
        endTime: "11:45",
        title: "3年3組",
        description: "見に来てくれた人たちに笑いを届ける",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_3" as PointColor,
        date: "7/5",
        classroom: "3年3組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:00",
        endTime: "12:25",
        title: "3年5組",
        description: "個性の違いを否定しない。様々な個性に対して中立的な立場をとる。違う個性どうし、協力して補い合っていく",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_4" as PointColor,
        date: "7/5",
        classroom: "3年5組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "12:40",
        endTime: "13:05",
        title: "3年6組",
        description: "人々の行き過ぎた思想によって生きづらくなっている",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_5" as PointColor,
        date: "7/5",
        classroom: "3年6組",
        pr: undefined,
        poster: undefined
      },
      {
        startTime: "13:20",
        endTime: "13:45",
        title: "3年4組",
        description: "意見の主張、絆、友情",
        labels: ["中学3年"],
        location: "アッセンブリー",
        pointColor: "point_6" as PointColor,
        date: "7/5",
        classroom: "3年4組",
        pr: undefined,
        poster: undefined
      }
    ]
  }
];
