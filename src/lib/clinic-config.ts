import type { Locale } from "./i18n";

export const clinicConfig = {
  name: {
    ja: "幹細胞クリニック東京",
    en: "Stem Cell Clinic Tokyo", // TODO_CONTENT_REVIEW: 正式英語名
    zh: "干细胞诊所东京", // TODO_TRANSLATION_REVIEW
    mn: "Үүдэн Эсийн Клиник Токио", // TODO_TRANSLATION_REVIEW
  },
  address: {
    ja: "東京都中央区銀座5丁目9-15 銀座清月堂ビル5F",
    en: "Ginza Seigetsudo Bldg. 5F, 5-9-15 Ginza, Chuo-ku, Tokyo",
    zh: "东京都中央区银座5丁目9-15 银座清月堂大厦5F", // TODO_TRANSLATION_REVIEW
    mn: "Токио, Чүө-ку, Гинза 5-9-15, Гинза Сэйгэцүдо барилга 5F", // TODO_TRANSLATION_REVIEW
  },
  phone: "03-6280-6020",
  email: "cs@kansaibou-clinic.or.jp",
  hours: {
    ja: "月〜土 10:00〜19:00（日曜休診）",
    en: "Mon–Sat 10:00–19:00 (Closed Sundays)",
    zh: "周一至周六 10:00–19:00（周日休诊）", // TODO_TRANSLATION_REVIEW
    mn: "Даваа–Бямба 10:00–19:00 (Ням гариг амарна)", // TODO_TRANSLATION_REVIEW
  },
  nearestStation: {
    ja: "東京メトロ銀座駅 A3出口 徒歩1分 / 東銀座駅 徒歩3分",
    en: "Ginza Station (Tokyo Metro) Exit A3, 1-min walk / Higashi-Ginza Station, 3-min walk",
    zh: "东京地铁银座站 A3出口 步行1分钟 / 东银座站 步行3分钟",
    mn: "Гинза станц (Токио Метро) A3 гарц, 1 мин алхалт / Хигаши-Гинза станц, 3 мин алхалт", // TODO_TRANSLATION_REVIEW
  },
  bookingUrl: "#", // TODO_OPERATION_CONFIRM: 予約リンク先URL
  googleMapUrl:
    "https://www.google.com/maps/search/?api=1&query=東京都中央区銀座5丁目9-15+銀座清月堂ビル5F", // TODO_OPERATION_CONFIRM
} as const;

export function getClinicName(locale: Locale): string {
  return clinicConfig.name[locale];
}

export function getClinicAddress(locale: Locale): string {
  return clinicConfig.address[locale];
}

export function getClinicHours(locale: Locale): string {
  return clinicConfig.hours[locale];
}

export function getClinicStation(locale: Locale): string {
  return clinicConfig.nearestStation[locale];
}
