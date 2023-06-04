export function getEligibleUsersForTarget(target) {
  return {
    $and: [
      { $not: { $in: ['$rollNumber', target.exclude] } },
      {
        $or: [
          { $in: ['$rollNumber', target.include] },
          {
            $let: {
              vars: {
                tg: {
                  $filter: {
                    input: target.groups,
                    as: 'group',
                    cond: {
                      $and: [
                        { $eq: ['$$group.year', '$admissionYear'] },
                        { $eq: ['$$group.program', '$program'] },
                        { $lte: ['$$group.minCredits', '$completedCredits'] },
                        { $lte: ['$$group.minCGPA', '$cgpa'] },
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
}