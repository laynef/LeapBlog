const dictionary = [

].reduce((acc, item) => {
    acc[item] = item;
    return acc;
}, {});

export const blackListAnimationRoutes = dictionary;
