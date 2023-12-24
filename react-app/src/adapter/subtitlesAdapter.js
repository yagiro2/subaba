import { removeExtenstion, sortSubsArrByVipAndAlphabet } from '../lib/utils';

function removeGzExtenstion(subDownloadLink) {
    /**
     * We remove the ".gz" from the end of the subtitle download link,
     * in order to allow downloading the subtitle file directly (and not inside a gz archive).
     * 
     * For example, here is a prestine SubDownloadLink:
     * https://dl.opensubtitles.org/en/download/src-api/vrf-19c90c52/filead/1956732800.gz
     * This function will return the link above without the ".gz" extenstion, like so:
     * https://dl.opensubtitles.org/en/download/src-api/vrf-19c90c52/filead/1956732800
     * 
     * If ".gz" is not found at the end of the link, it will remain the same.
     * */

     return subDownloadLink && subDownloadLink.replace(/\.gz$/, '');
}


const normalizeSubtitle = rawSubtitle => {
    return {
        ...rawSubtitle,
        description: removeExtenstion(rawSubtitle.SubFileName),
        directDownloadLink: removeGzExtenstion(rawSubtitle.SubDownloadLink),
    };
};

export const normalizeSubtitlesResponse = response => {
    if (!response.success) return;
    return sortSubsArrByVipAndAlphabet(response.data)
        .map(normalizeSubtitle);
};
