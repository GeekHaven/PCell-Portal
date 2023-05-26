export const isUserEligibleInTarget = (user) => {
  return {
    $and: [
      { $not: { $in: [user.rollNumber, '$targets.exclude'] } },
      {
        $or: [
          { $in: [user.rollNumber, '$targets.include'] },
          {
            $let: {
              vars: {
                tg: {
                  $filter: {
                    input: '$targets.groups',
                    as: 'group',
                    cond: {
                      $and: [
                        { $eq: ['$$group.year', user.admissionYear] },
                        { $eq: ['$$group.program', user.program] },
                        { $lte: ['$$group.minCredits', user.completedCredits] },
                        { $lte: ['$$group.minCGPA', user.cgpa] },
                      ],
                    },
                  },
                },
              },
              in: { $gt: [{ $size: '$$tg' }, 0] },
            },
          },
        ],
      },
    ],
  };
};
