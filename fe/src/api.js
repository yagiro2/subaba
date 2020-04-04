const baseUrl = 'https://subaba-stg.herokuapp.com/api';
const createUrl = relativeUrl => baseUrl + relativeUrl;

// todo: uncomment!!
// export const searchSubtitleByQuery = (query, langCode = 'heb') => {
//     return fetch(createUrl(`/subs?lang=${ langCode }&query=${ query }`))
//         .then(res => res.json());
// };

// todo: remove!
export const searchSubtitleByQuery = (query, langCode = 'all') => {

    return new Promise(resolve => setTimeout(() => resolve(mockRes) ,1000));

    // return Promise.resolve(mockRes);
};

// todo: remove move res
const mockRes = {
    "en": {
      "url": "https://dl.opensubtitles.org/en/download/src-api/vrf-19b50c59/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1953237819",
      "langcode": "en",
      "downloads": 339412,
      "lang": "English",
      "encoding": "UTF-8",
      "id": "1953237819",
      "filename": "The.Lion.King.1994.720p.BluRay.DD5.1.x264-DON.srt",
      "date": "2012-10-18 00:03:26",
      "score": 0.5,
      "fps": 23.976,
      "format": "srt",
      "utf8": "https://dl.opensubtitles.org/en/download/subencoding-utf8/src-api/vrf-19b50c59/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1953237819",
      "vtt": "https://dl.opensubtitles.org/en/download/subformat-vtt/src-api/vrf-19b50c59/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1953237819"
    },
    "es": {
      "url": "https://dl.opensubtitles.org/en/download/src-api/vrf-198c0c53/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1952031489",
      "langcode": "es",
      "downloads": 91324,
      "lang": "Spanish",
      "encoding": "CP1252",
      "id": "1952031489",
      "filename": "the.lion.king.1994.dvdrip.xvid.int-jollyroger.srt",
      "date": "2009-01-27 04:25:16",
      "score": 0.5,
      "fps": 25,
      "format": "srt",
      "utf8": "https://dl.opensubtitles.org/en/download/subencoding-utf8/src-api/vrf-198c0c53/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1952031489",
      "vtt": "https://dl.opensubtitles.org/en/download/subformat-vtt/src-api/vrf-198c0c53/sid-gg,NrTQnCvB1tHVI8DndrHjLDl9/filead/1952031489"
    }
  };