/*
request examples:
curl -A 'TemporaryUserAgent'  https://rest.opensubtitles.org/search/moviebytesize-750005572/moviehash-319b23c54e9cf314
curl -A 'TemporaryUserAgent'  https://rest.opensubtitles.org/search/episode-20/imdbid-4145054/moviebytesize-750005572/moviehash-319b23c54e9cf314/season-2/sublanguageid-eng
curl -A 'TemporaryUserAgent'  https://rest.opensubtitles.org/search/episode-11/imdbid-4145054/season-1/tags-web-dl
curl -A 'TemporaryUserAgent'  https://rest.opensubtitles.org/search/query-matrix%20reloaded/sublanguageid-eng
curl -A 'TemporaryUserAgent'  https://rest.opensubtitles.org/search/episode-8/sublanguageid-eng/tag-heroess01e08
*/

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


export const searchSubtitleByQuery = (query, langCode = 'all') => {
    return new Promise(resolve => setTimeout(() => resolve(mockRes) ,1000));
};