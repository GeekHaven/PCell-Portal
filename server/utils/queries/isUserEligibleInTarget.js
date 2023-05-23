export const isUserEligibleInTarget = (user, targetsFieldName = 'targets') => {
  return {
    $and: [
      { $not: { $in: [user.rollNumber, '$' + targetsFieldName + '.exclude'] } },
      {
        $or: [
          { $in: [user.rollNumber, '$' + targetsFieldName + '.include'] },
          {
            $and: [
              {
                $in: [user.program, '$' + targetsFieldName + '.groups.program'],
              },
              {
                $in: [
                  user.admissionYear,
                  '$' + targetsFieldName + '.groups.year',
                ],
              },
              { $gte: [user.cgpa, '$' + targetsFieldName + '.groups.minCGPA'] },
              {
                $gte: [
                  user.completedCredits,
                  '$' + targetsFieldName + '.groups.minCredits',
                ],
              },
            ],
          },
        ],
      },
    ],
  };
};
