const arrs = {

  ascii: [
    "NUL",
    "SOH",
    "STX",
    "ETX",
    "EOT",
    "ENQ",
    "ACK",
    "BEL",
    "BS",
    "TAB",
    "LF",
    "VT",
    "FF",
    "CR",
    "SO",
    "SI",
    "DLE",
    "DC1",
    "DC2",
    "DC3",
    "DC4",
    "NAK",
    "SYN",
    "ETB",
    "CAN",
    "EM",
    "SUB",
    "ESC",
    "FS",
    "GS",
    "RS",
    "US",
    " ",
    "!",
    "\"",
    "#",
    "$",
    "%",
    "&",
    "'",
    "(",
    ")",
    "*",
    "+",
    ",",
    "-",
    ".",
    "/",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ":",
    ";",
    "<",
    "=",
    ">",
    "?",
    "@",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "[",
    "\\",
    "]",
    "^",
    "_",
    "`",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "{",
    "|",
    "}",
    "~",
    "δ"
  ],

  dec_hexa: {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "A": 10,
    "B": 11,
    "C": 12,
    "D": 13,
    "E": 14,
    "F": 15,
  },

  hexa_dec: {
    "10": "A",
    "11": "B",
    "12": "C",
    "13": "D",
    "14": "E",
    "15": "F",
  },

}

const soloCalc = {
  "asc-bin": {
    convert(conv, stopError) {
      const dec = soloCalc["asc-dec"].convert(conv, stopError);
      const bin = soloCalc["dec-bin"].convert(dec, stopError);
      return `${bin}`;
    }
  },
  "asc-dec": {
    convert(conv, stopError) {
      if (!arrs.ascii.includes(conv)) {
        if (stopError) {
          throw new RangeError("Character out of valid ASCII range.");
        }
        return "NaN";
      }
      let dec = arrs.ascii.indexOf(`${conv}`);
      return `${dec}`;
    }
  },
  "asc-hex": {
    convert(conv, stopError) {
      const dec = soloCalc["asc-dec"].convert(conv, stopError);
      const hex = soloCalc["dec-hex"].convert(dec, stopError);
      return `${hex}`;
    }
  },

  "bin-asc": {
    convert(conv, stopError) {
      const dec = soloCalc["bin-dec"].convert(conv, stopError);
      const asc = soloCalc["dec-asc"].convert(dec, stopError);
      return `${asc}`;
    }
  },
  "bin-dec": {
    convert(conv, stopError) {
      let revConvArr = ref.deci.reverse(conv);
      let finNum = 0;

      for (let i = 0; i < revConvArr.length; i++) {
        if (revConvArr != `1` && revConvArr != `0` && stopError) {
          throw new Error("Input contains non-Binary element(s).");
        }
        if (revConvArr[i]*1 == 1) {
          let num = Math.pow(2, i);
          finNum+=num;
        }
      }

      return `${finNum}`;
    }
  },
  "bin-hex": {
    convert(conv, stopError) {
      const dec = soloCalc["bin-dec"].convert(conv, stopError);
      const hex = soloCalc["dec-hex"].convert(dec, stopError);
      return `${hex}`;
    }
  },

  "dec-asc": {
    convert(conv, stopError) {
      if (isNaN(conv*1) || conv*1 > 128 || conv*1 < 0) {
        if (stopError) {
          throw new RangeError("Decimal out of valid ASCII range.");
        }
        return "null";
      }
      let ascii = arrs.ascii[`${conv}`];
      return `${ascii}`;
    }
  },
  "dec-bin": {
      convert(conv, stopError) {
        let integer = conv*1;
        let binaryNum = [];

        if (isNaN(integer) && stopError) {
          throw new Error("Input contains non-Decimal element(s).");
        } else if (isNaN(integer) && !stopError) {
          return "NaN";
        }

        while (integer != 0) {
          let remainder = integer % 2;
          let quotient = (integer - remainder) / 2;
          binaryNum.unshift(remainder);
          integer = quotient;
        }

        let binNum = binaryNum.join("");
        return `${binNum}`;
      }
  },
  "dec-hex": {
      convert(conv, stopError) {
        let finHex = "";
        let num = conv*1;

        if (isNaN(num) && stopError) {
          throw new Error("Input contains non-Decimal element(s).");
        }

        let places = 0;
        while (conv >= Math.pow(16, places)) {
          places++;
        }

        for (let i = places-1; i > -1; i--) {
          let base16 = Math.pow(16, i);
          let result = ref.hexa.check16(num, base16);
          let decConv = result[0];
          num = result[1];

          let decConved;
          if (decConv*1 < 10) {
            decConved = decConv;
          } else {
            decConved = arrs.hexa_dec[decConv];
          }
          finHex+=`${decConved}`;
        }
        return `${finHex}`;
      }
  },

  "hex-asc": {
    convert(conv, stopError) {
      const dec = soloCalc["hex-dec"].convert(conv, stopError);
      const asc = soloCalc["dec-asc"].convert(dec, stopError);
      return `${asc}`;
    }
  },
  "hex-bin": {
    convert(conv, stopError) {
      const dec = soloCalc["hex-dec"].convert(conv, stopError);
      const bin = soloCalc["dec-bin"].convert(dec, stopError);
      return `${bin}`;
    }
  },
  "hex-dec": {
    convert(conv, stopError) {

      let convArr = `${conv}`.toUpperCase().split("");
      let num = 0;

      let x = convArr.length-1;
      for (let i = 0; i < convArr.length; i++) {
        if (!Object.keys(arrs.dec_hexa).includes(convArr[i]) && stopError) {
          throw new RangeError("Input out of valid Hexadecimal range.");
        }
        let multi = Math.pow(16, x);
        let segNum = arrs.dec_hexa[convArr[i]] * multi;
        num+=segNum;
        x--
      }

      return `${num}`;
    }
  },
}

const ref = {
  hexa: {
    check16(num, base) {
      for (let i = 1; i < 17; i++) {
        if (base*i > num) {
          return [ i-1, num-(base*(i-1)) ];
          break;
        } else if (base*i == num) {
          return [ i, num-(base*(i)) ];
          break;
        } else {
          continue;
        }
      }
    }
  },
  deci: {
    reverse(binNum) {
      let str = binNum.toString();
      let strArr = str.split("");
      let finArr = [ ];
      for (let i = strArr.length-1; i > -1; i--) {
        finArr.push(strArr[i]*1);
      }
      return finArr;
    }
  },
  multi: {
    convert(conv, conversion, stopError) {
      const splitFactor = ref.formatting[conversion].space;
      const autoSpace = ref.formatting[conversion].auto;
      let convArr = conv.toString().split(splitFactor);
      let finStr = "";

      for (let i = 0; i < convArr.length; i++) {
        const fin = soloCalc[`${conversion}`].convert(convArr[i], stopError);
        finStr+=`${fin}`;
        if (i+1 != convArr.length && autoSpace) {
          finStr+=" ";
        }
      }

      return `${finStr}`;
    }
  },
  formatting: {
    "asc-bin": {
      auto: true,
      space: ""
    },
    "asc-dec": {
      auto: true,
      space: ""
    },
    "asc-hex": {
      auto: true,
      space: ""
    },
    "bin-asc": {
      auto: false,
      space: " "
    },
    "bin-dec": {
      auto: true,
      space: " "
    },
    "bin-hex": {
      auto: true,
      space: " "
    },
    "dec-asc": {
      auto: false,
      space: " "
    },
    "dec-bin": {
      auto: true,
      space: " "
    },
    "dec-hex": {
      auto: true,
      space: " "
    },
    "hex-asc": {
      auto: false,
      space: " "
    },
    "hex-bin": {
      auto: true,
      space: " "
    },
    "hex-dec": {
      auto: true,
      space: " "
    },
  }
}

module.exports = { ref };
