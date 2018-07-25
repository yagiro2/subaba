function findSubs(data, success, error) {
    const { query, hash, file } = data;
    const lang = getLang();
    const hashParam = hash ? `&hash=${hash}` : '';
    const queryParam = query ? `&query=${query}` : '';
    const filenameParam = file ? `&filename=${file.name}` : '';
    const filesizeParam = file ? `&filesize=${file.size}` : '';

    $.ajax(`${config.apiUrl}/subs?lang=${lang}${filenameParam}${filesizeParam}${hashParam}${queryParam}`, {
        success,
        error,
    });
}