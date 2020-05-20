const isHash = (link: string): boolean => {
    return link ? link.charAt(0) === '#' : false;
};

export default isHash;
