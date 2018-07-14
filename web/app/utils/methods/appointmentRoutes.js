const dictionary = [
    `/${process.env.BASE_URL}/dashboard`,
    `/${process.env.BASE_URL}/appointments/:id`,
    `/${process.env.BASE_URL}/clients`,
    `/${process.env.BASE_URL}/scheduler`,
    `/${process.env.BASE_URL}/preview/:full_name`,
].reduce((acc, item) => {
    acc[item] = item;
    return acc;
}, {});

export const appointmentRoutes = dictionary;