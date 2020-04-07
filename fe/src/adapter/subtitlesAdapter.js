import { removeExtenstion, sortSubsArrByVipAndAlphabet } from '../lib/utils';

const normalizeSubtitle = rawSubtitle => {
    return {
        ...rawSubtitle,
        description: removeExtenstion(rawSubtitle.SubFileName),
    };
};

export const normalizeSubtitlesResponse = response => {
    if (!response.success) return;
    return sortSubsArrByVipAndAlphabet(response.data)
        .map(normalizeSubtitle);
};
