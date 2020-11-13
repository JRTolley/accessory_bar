function displayPrice(price: string) {
  // Check all these out
  const amount = price;

  // figure out what these ones mean
  const amount_with_comma_seperator = price;
  const amount_no_decimals = price;
  const amount_no_decimals_with_comma_separator = price;
  const amount_with_space_separator = price;
  const amount_no_decimals_with_space_separator = price;

  const currencies = {
    AED: {
      moneyFormat: `Dhs. ${amount}`,
      moneyWithCurrencyFormat: `Dhs. ${amount} AED`,
    },
    AFN: {
      moneyFormat: `${amount}Ø‹`,
      moneyWithCurrencyFormat: `${amount}Ø‹`,
    },
    ALL: {
      moneyFormat: `Lek ${amount}`,
      moneyWithCurrencyFormat: `Lek ${amount} ALL`,
    },
    AMD: {
      moneyFormat: `${amount} AMD`,
      moneyWithCurrencyFormat: `${amount} AMD`,
    },
    ANG: {
      moneyFormat: `Æ’;${amount}`,
      moneyWithCurrencyFormat: `Æ’;${amount} ANG`,
    },
    AOA: {
      moneyFormat: `Kz${amount}`,
      moneyWithCurrencyFormat: `Kz${amount} AOA`,
    },
    ARS: {
      moneyFormat: `${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} ARS`,
    },
    AUD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} AUD`,
    },
    AWG: {
      moneyFormat: `Afl${amount}`,
      moneyWithCurrencyFormat: `Afl${amount} AWG`,
    },
    AZN: {
      moneyFormat: `m.${amount}`,
      moneyWithCurrencyFormat: `m.${amount} AZN`,
    },
    BAM: {
      moneyFormat: `KM $${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `KM $${amount_with_comma_seperator} BAM`,
    },
    BBD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} BBD`,
    },
    BDT: {
      moneyFormat: `Tk ${amount}`,
      moneyWithCurrencyFormat: `Tk ${amount} BDT`,
    },
    BGN: {
      moneyFormat: `${amount} Ð»Ð²`,
      moneyWithCurrencyFormat: `${amount} Ð»Ð²`,
    },
    BIF: {
      moneyFormat: `FBu. ${amount_no_decimals}`,
      moneyWithCurrencyFormat: `FBu. ${amount_no_decimals} BIF`,
    },
    BMD: {
      moneyFormat: `BD${amount}`,
      moneyWithCurrencyFormat: `BD${amount} BMD`,
    },
    BND: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} BND`,
    },
    BOB: {
      moneyFormat: `Bs${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `Bs${amount_with_comma_seperator} BOB`,
    },
    BRL: {
      moneyFormat: `R$ ${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `R$ ${amount_with_comma_seperator} BRL`,
    },
    BSD: {
      moneyFormat: `BS${amount}`,
      moneyWithCurrencyFormat: `BS${amount} BSD`,
    },
    BWP: {
      moneyFormat: `P${amount}`,
      moneyWithCurrencyFormat: `P${amount} BWP`,
    },
    BZD: {
      moneyFormat: `BZ${amount}`,
      moneyWithCurrencyFormat: `BZ${amount} BZD`,
    },
    CAD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount}`,
    },
    CDF: {
      moneyFormat: `FC${amount}`,
      moneyWithCurrencyFormat: `FC${amount} CDF`,
    },
    CHF: {
      moneyFormat: `SFr. ${amount}`,
      moneyWithCurrencyFormat: `SFr. ${amount} CHF`,
    },
    CLP: {
      moneyFormat: `${amount_no_decimals_with_comma_separator}`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} CLP`,
    },
    CNY: {
      moneyFormat: `Â¥${amount}`,
      moneyWithCurrencyFormat: `Â¥${amount} CNY`,
    },
    COP: {
      moneyFormat: `$${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `$${amount_with_comma_seperator} COP`,
    },
    CRC: {
      moneyFormat: `â‚¡ ${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `â‚¡ ${amount_with_comma_seperator} CRC`,
    },
    CVE: {
      moneyFormat: `${amount_with_space_separator}$`,
      moneyWithCurrencyFormat: `${amount_with_space_separator}$`,
    },
    CZK: {
      moneyFormat: `${amount_with_comma_seperator} KÄ`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} KÄ`,
    },
    DJF: {
      moneyFormat: `${amount_no_decimals_with_comma_separator} Fdj`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} DJF`,
    },
    DKK: {
      moneyFormat: `${amount_with_comma_seperator} kr`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} kr`,
    },
    DOP: {
      moneyFormat: `RD$ ${amount}`,
      moneyWithCurrencyFormat: `RD$ ${amount} DOP`,
    },
    DZD: {
      moneyFormat: `DA ${amount}`,
      moneyWithCurrencyFormat: `DA ${amount} DZD`,
    },
    EGP: {
      moneyFormat: `LE ${amount}`,
      moneyWithCurrencyFormat: `LE ${amount} EGP`,
    },
    ETB: {
      moneyFormat: `Br${amount}`,
      moneyWithCurrencyFormat: `Br${amount} ETB`,
    },
    EUR: {
      moneyFormat: `â‚¬${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `â‚¬${amount_with_comma_seperator} EUR`,
    },
    FJD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} FJD`,
    },
    FKP: {
      moneyFormat: `£${amount}`,
      moneyWithCurrencyFormat: `£${amount} FKP`,
    },
    GBP: {
      moneyFormat: `£${amount}`,
      moneyWithCurrencyFormat: `£${amount} GBP`,
    },
    GEL: {
      moneyFormat: `${amount} GEL`,
      moneyWithCurrencyFormat: `${amount} GEL`,
    },
    GIP: {
      moneyFormat: `£${amount}`,
      moneyWithCurrencyFormat: `£${amount} GIP`,
    },
    GMD: {
      moneyFormat: `D ${amount}`,
      moneyWithCurrencyFormat: `D ${amount} GMD`,
    },
    GNF: {
      moneyFormat: `FG ${amount_no_decimals}`,
      moneyWithCurrencyFormat: `FG ${amount_no_decimals} GNF`,
    },
    GTQ: {
      moneyFormat: `Q${amount}`,
      moneyWithCurrencyFormat: `Q${amount} GTQ`,
    },
    GYD: {
      moneyFormat: `G${amount}`,
      moneyWithCurrencyFormat: `G${amount} GYD`,
    },
    HKD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} HKD`,
    },
    HNL: {
      moneyFormat: `L ${amount}`,
      moneyWithCurrencyFormat: `L ${amount} HNL`,
    },
    HRK: {
      moneyFormat: `${amount_with_comma_seperator} kn`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} kn`,
    },
    HTG: {
      moneyFormat: `G ${amount}`,
      moneyWithCurrencyFormat: `G ${amount} HTG`,
    },
    HUF: {
      moneyFormat: `${amount_no_decimals_with_comma_separator}`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} HUF`,
    },
    IDR: {
      moneyFormat: `${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} IDR`,
    },
    ILS: {
      moneyFormat: `${amount} NIS`,
      moneyWithCurrencyFormat: `${amount} NIS`,
    },
    INR: {
      moneyFormat: `Rs. ${amount}`,
      moneyWithCurrencyFormat: `Rs. ${amount} INR`,
    },
    ISK: {
      moneyFormat: `${amount_no_decimals_with_comma_separator} kr`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} ISK`,
    },
    JMD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} JMD`,
    },
    JPY: {
      moneyFormat: `¥${amount_no_decimals}`,
      moneyWithCurrencyFormat: `¥${amount_no_decimals} JPY`,
    },
    KES: {
      moneyFormat: `KSh${amount}`,
      moneyWithCurrencyFormat: `KSh${amount} KES`,
    },
    KGS: {
      moneyFormat: `Ð»Ð²${amount}`,
      moneyWithCurrencyFormat: `Ð»Ð²${amount} KGS`,
    },
    KHR: {
      moneyFormat: `KHR${amount}`,
      moneyWithCurrencyFormat: `KHR${amount} KHR`,
    },
    KMF: {
      moneyFormat: `${amount_no_decimals_with_comma_separator} CF`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} CF`,
    },
    KRW: {
      moneyFormat: `â‚©${amount_no_decimals}`,
      moneyWithCurrencyFormat: `â‚©${amount_no_decimals} KRW`,
    },
    KYD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} KYD`,
    },
    KZT: {
      moneyFormat: `${amount} KZT`,
      moneyWithCurrencyFormat: `${amount} KZT`,
    },
    LAK: {
      moneyFormat: `â‚­${amount}`,
      moneyWithCurrencyFormat: `â‚­${amount} LAK`,
    },
    LBP: {
      moneyFormat: `LÂ£${amount}`,
      moneyWithCurrencyFormat: `LÂ£${amount} LBP`,
    },
    LKR: {
      moneyFormat: `Rs ${amount}`,
      moneyWithCurrencyFormat: `Rs ${amount} LKR`,
    },
    LRD: {
      moneyFormat: `L${amount}`,
      moneyWithCurrencyFormat: `L${amount} LRD`,
    },
    LSL: {
      moneyFormat: `M${amount}`,
      moneyWithCurrencyFormat: `M${amount} LSL`,
    },
    MAD: {
      moneyFormat: `${amount} dh`,
      moneyWithCurrencyFormat: `${amount} dh`,
    },
    MDL: {
      moneyFormat: `${amount} MDL`,
      moneyWithCurrencyFormat: `${amount} MDL`,
    },
    MKD: {
      moneyFormat: `Ð´ÐµÐ½ ${amount}`,
      moneyWithCurrencyFormat: `Ð´ÐµÐ½ ${amount} MKD`,
    },
    MMK: {
      moneyFormat: `K${amount}`,
      moneyWithCurrencyFormat: `K${amount} MMK`,
    },
    MNT: {
      moneyFormat: `${amount_no_decimals} â‚®`,
      moneyWithCurrencyFormat: `${amount_no_decimals} â‚®`,
    },
    MOP: {
      moneyFormat: `MOP${amount}`,
      moneyWithCurrencyFormat: `MOP${amount} MOP`,
    },
    MUR: {
      moneyFormat: `Rs ${amount}`,
      moneyWithCurrencyFormat: `Rs ${amount} MUR`,
    },
    MVR: {
      moneyFormat: `Rf${amount}`,
      moneyWithCurrencyFormat: `Rf${amount} MVR`,
    },
    MWK: {
      moneyFormat: `Mk${amount}`,
      moneyWithCurrencyFormat: `Mk${amount} MWK`,
    },
    MXN: {
      moneyFormat: `$ ${amount}`,
      moneyWithCurrencyFormat: `$ ${amount} MXN`,
    },
    MYR: {
      moneyFormat: `RM${amount} MYR`,
      moneyWithCurrencyFormat: `RM${amount} MYR`,
    },
    MZN: {
      moneyFormat: `${amount} Mt`,
      moneyWithCurrencyFormat: `${amount} Mt`,
    },
    NAD: {
      moneyFormat: `N${amount}`,
      moneyWithCurrencyFormat: `N${amount} NAD`,
    },
    NGN: {
      moneyFormat: `â‚¦${amount}`,
      moneyWithCurrencyFormat: `â‚¦${amount} NGN`,
    },
    NIO: {
      moneyFormat: `C${amount}`,
      moneyWithCurrencyFormat: `C${amount} NIO`,
    },
    NOK: {
      moneyFormat: `${amount_with_comma_seperator} kr`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} kr`,
    },
    NPR: {
      moneyFormat: `Rs${amount}`,
      moneyWithCurrencyFormat: `Rs${amount} NPR`,
    },
    NZD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} NZD`,
    },
    PAB: {
      moneyFormat: `B/. ${amount}`,
      moneyWithCurrencyFormat: `B/. ${amount} PAB`,
    },
    PEN: {
      moneyFormat: `S/. ${amount}`,
      moneyWithCurrencyFormat: `S/. ${amount} PEN`,
    },
    PGK: {
      moneyFormat: `K ${amount}`,
      moneyWithCurrencyFormat: `K ${amount} PGK`,
    },
    PHP: {
      moneyFormat: `â‚±${amount}`,
      moneyWithCurrencyFormat: `â‚±${amount} PHP`,
    },
    PKR: {
      moneyFormat: `Rs.${amount}`,
      moneyWithCurrencyFormat: `Rs.${amount} PKR`,
    },
    PLN: {
      moneyFormat: `${amount_with_comma_seperator} zl`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} zl`,
    },
    PYG: {
      moneyFormat: `Gs. ${amount_no_decimals_with_comma_separator}`,
      moneyWithCurrencyFormat: `Gs. ${amount_no_decimals_with_comma_separator} PYG`,
    },
    QAR: {
      moneyFormat: `QAR ${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `QAR ${amount_with_comma_seperator} QAR`,
    },
    RON: {
      moneyFormat: `${amount_with_comma_seperator} lei`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} lei`,
    },
    RSD: {
      moneyFormat: `${amount} RSD`,
      moneyWithCurrencyFormat: `${amount} RSD`,
    },
    RUB: {
      moneyFormat: `Ñ€ÑƒÐ±${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `Ñ€ÑƒÐ±${amount_with_comma_seperator} RUB`,
    },
    RWF: {
      moneyFormat: `${amount_no_decimals} RF`,
      moneyWithCurrencyFormat: `${amount_no_decimals} RWF`,
    },
    SAR: {
      moneyFormat: `${amount} SR`,
      moneyWithCurrencyFormat: `${amount} SR`,
    },
    SBD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} SBD`,
    },
    SCR: {
      moneyFormat: `Rs ${amount}`,
      moneyWithCurrencyFormat: `Rs ${amount} SCR`,
    },
    SEK: {
      moneyFormat: `${amount_no_decimals_with_space_separator} kr`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_space_separator} kr`,
    },
    SGD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} SGD`,
    },
    SHP: {
      moneyFormat: `Â£${amount}`,
      moneyWithCurrencyFormat: `Â£${amount} SHP`,
    },
    SLL: {
      moneyFormat: `Le ${amount}`,
      moneyWithCurrencyFormat: `Le ${amount} SLL`,
    },
    SRD: {
      moneyFormat: `SRD ${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `SRD ${amount_with_comma_seperator} SRD`,
    },
    STD: {
      moneyFormat: `Db ${amount}`,
      moneyWithCurrencyFormat: `Db ${amount} STD`,
    },
    SZL: {
      moneyFormat: `L ${amount}`,
      moneyWithCurrencyFormat: `L ${amount} SZL`,
    },
    THB: {
      moneyFormat: `${amount} à¸¿`,
      moneyWithCurrencyFormat: `${amount} à¸¿`,
    },
    TJS: {
      moneyFormat: `TJS ${amount}`,
      moneyWithCurrencyFormat: `TJS ${amount} TJS`,
    },
    TOP: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} TOP`,
    },
    TRY: {
      moneyFormat: `${amount}TL`,
      moneyWithCurrencyFormat: `${amount}TL`,
    },
    TTD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} TTD`,
    },
    TWD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} TWD`,
    },
    TZS: {
      moneyFormat: `${amount} TZS`,
      moneyWithCurrencyFormat: `${amount} TZS`,
    },
    UAH: {
      moneyFormat: `â‚´${amount}`,
      moneyWithCurrencyFormat: `â‚´${amount} UAH`,
    },
    UGX: {
      moneyFormat: `Ush ${amount_no_decimals}`,
      moneyWithCurrencyFormat: `Ush ${amount_no_decimals} UGX`,
    },
    USD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} USD`,
    },
    UYU: {
      moneyFormat: `$${amount_with_comma_seperator}`,
      moneyWithCurrencyFormat: `$${amount_with_comma_seperator} UYU`,
    },
    UZS: {
      moneyFormat: `${amount_no_decimals_with_space_separator} som`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_space_separator} som`,
    },
    VND: {
      moneyFormat: `${amount_no_decimals_with_comma_separator}â‚«`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_comma_separator} VND`,
    },
    VUV: {
      moneyFormat: `${amount_no_decimals}`,
      moneyWithCurrencyFormat: `${amount_no_decimals}VT`,
    },
    WST: {
      moneyFormat: `WS$ ${amount}`,
      moneyWithCurrencyFormat: `WS$ ${amount} WST`,
    },
    XAF: {
      moneyFormat: `FCFA${amount_no_decimals}`,
      moneyWithCurrencyFormat: `FCFA${amount_no_decimals} XAF`,
    },
    XCD: {
      moneyFormat: `${amount}`,
      moneyWithCurrencyFormat: `${amount} XCD`,
    },
    XOF: {
      moneyFormat: `CFA${amount_no_decimals}`,
      moneyWithCurrencyFormat: `CFA${amount_no_decimals} XOF`,
    },
    XPF: {
      moneyFormat: `${amount_no_decimals_with_space_separator} XPF`,
      moneyWithCurrencyFormat: `${amount_no_decimals_with_space_separator} XPF`,
    },
    YER: {
      moneyFormat: `${amount_with_comma_seperator} YER`,
      moneyWithCurrencyFormat: `${amount_with_comma_seperator} YER`,
    },
    ZAR: {
      moneyFormat: `R ${amount}`,
      moneyWithCurrencyFormat: `R ${amount} ZAR`,
    },
    ZMW: {
      moneyFormat: `K${amount_no_decimals_with_comma_separator}`,
      moneyWithCurrencyFormat: `K${amount_no_decimals_with_comma_separator} ZMW`,
    },
  };

  let metaprop = document.querySelector("meta[property='og:price:currency']");
  if (!metaprop) {
    metaprop = document.querySelector(
      "meta[property='product:price:currency']"
    );
  }

  const moneytype = metaprop.getAttribute("content");
  console.log("MoneyType: ", moneytype);

  return currencies[moneytype].moneyFormat;
}
