const getAva = (name: string) => {
    const splitted: string[] = name.split(' ');
    if (splitted.length <= 0) {
        return 'OO';
    }
    return splitted[0]![0]?.toLocaleUpperCase()! + splitted[splitted.length - 1]![0]?.toLocaleUpperCase();

}


export { getAva }