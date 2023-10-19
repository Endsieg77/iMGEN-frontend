import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import GavelIcon from "@mui/icons-material/Gavel";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SchoolIcon from "@mui/icons-material/School";

export const CLIENT_URL = "http://localhost:3000";
export const BUYMEACOFFEE_URL = `${CLIENT_URL}/buymeacoffee`;
export const DISPLAY_URL = `${CLIENT_URL}/display`;
export const GALLERY_URL = `${CLIENT_URL}/gallery`;

export const PETPET_URL = `${CLIENT_URL}/do/petpet`;
export const GIGANTA_URL = `${CLIENT_URL}/do/giganta`;
export const PERFECT_URL = `${CLIENT_URL}/do/perfect`;
export const MARRY_URL = `${CLIENT_URL}/do/marry`;
export const BRAIN_URL = `${CLIENT_URL}/do/brain`;
export const DRVV_URL = `${CLIENT_URL}/do/drvv`;

export const LOG_IN_URL = `${CLIENT_URL}/user/login`;
export const SIGN_UP_URL = `${CLIENT_URL}/user/signup`;
export const FORGOT_URL = `${CLIENT_URL}/user/forgot`;
export const PROFILE_URL = `${CLIENT_URL}/user/profile`;

export const SERVER_URL = "http://localhost:8080";
export const UPLOAD_URL = `${SERVER_URL}/upload`;

export const USER_URL = `${SERVER_URL}/user`;
export const SIGN_UP_REQ_URL = `${USER_URL}/signup`;
export const FORGOT_REQ_URL = `${USER_URL}/forgot`;
export const LOG_IN_REQ_URL = `${USER_URL}/login`;
export const AUTO_LOG_IN_REQ_URL = `${USER_URL}/autologin`;
export const VERIFYEMAIL_REQ_URL = `${USER_URL}/verifyEmail`;
export const RESETPWD_REQ_URL = `${USER_URL}/resetPwd`;

export const IMGEN_URL = `${SERVER_URL}/imgen`;
export const PET_REQ_URL = `${IMGEN_URL}/petpet`;
export const GIG_REQ_URL = `${IMGEN_URL}/giganta`;
export const PERF_REQ_URL = `${IMGEN_URL}/perfect`;
export const MARR_REQ_URL = `${IMGEN_URL}/marry`;
export const BRAI_REQ_URL = `${IMGEN_URL}/brain`;
export const DRVV_REQ_URL = `${IMGEN_URL}/drvv`;
export const ACQUIRE_URL = `${IMGEN_URL}/acquire`;
export const LAST5_URL = `${IMGEN_URL}/last5`;
export const IMGENLIST_URL = `${IMGEN_URL}/imglist`;
export const DELETEREQ_URL = `${IMGEN_URL}/delete`;
export const DETAILREQ_URL = `${IMGEN_URL}/detail`;

export const category2num = {
  PETPET:  0b000001,
  GIGANTA: 0b000010,
  PERFECT: 0b000100,
  MARRY:   0b001000,
  BRAIN:   0b010000,
  DRVV:    0b100000,
};

export const category2info = {
  PETPET: {
    url: PETPET_URL,
    ico: <CatchingPokemonIcon color="primary" />,
  },
  GIGANTA: {
    url: GIGANTA_URL,
    ico: <GavelIcon color="primary" />,
  },
  PERFECT: {
    url: PERFECT_URL,
    ico: <ThumbUpAltIcon color="primary" />,
  },
  MARRY: {
    url: MARRY_URL,
    ico: <VolunteerActivismIcon color="primary" />,
  },
  BRAIN: {
    url: BRAIN_URL,
    ico: <PsychologyIcon color="primary" />,
  },
};

export const premiumContents = {
  DRVV: {
    url: DRVV_URL,
    ico: <SchoolIcon color="primary" />,
  },
};

export const ALL = {...category2info, ...premiumContents};

export const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAznsH7T/BEahWOkjVqgLhPH68NWjMUfaSohresjzwRVWfvWeVwcP2+BLnFxVcJjtY4Te8IfQcJZfPiyVBgaLjHKFa8Snomo138RDCIpdB/FXxGJqm8ShkYZohow0+8APt2/nKawRUznCYOz6uhA3S+3F8XMsVRDEhXyp87x7R7lYC+rRwVlGA9qX2AFEA/g9QcMbyekDpEetHs/JQ0EzvS10Mnc3XsJoX9PfullDUDE4EL6Zf+AP7LRQ25446xE/4YF0aPz4loNi0JjIPJE9xSOavjfUW65TtKKS64XqUAZpexXQ8iGVsKH0ObagvTQGToSj2c81yj4Mj9Um8ZEbWbwIDAQAB`;

export function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name
      .split(" ")
      .map((s) => s[0])
      .join(" ")}`,
  };
}

// export const atob = (string) => Buffer.from(string).toString('base64')
