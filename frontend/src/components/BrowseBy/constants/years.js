export const years = [
  ...Array.from({ length: 16 }, (_, i) => {
    const decade = 2020 - i * 10;

    return {
      id: decade,
      name: `${decade}s`,
    };
  }),
];
