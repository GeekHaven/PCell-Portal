export const getPaginatedCompanies = async (req, res) => {
  const { onlyEligible, sort, q } = req.query;
  const options = {
    pagination: req.query.page !== -1,
    page: req.query.page,
    limit: req.query.limit,
    sort: sort,
  };

  let query = {};
  if (onlyEligible) {
    query = {
      targets: {
        $elemMatch: {
          program: req.user.program,
          year: req.user.admissionYear,
          requiredCGPA: { $gte: req.user.cgpa },
        },
      },
    };
  }
  if (q) {
    query = {
      ...query,
      $or: [
        { name: { $regex: new RegExp(q), $options: 'i' } },
        { techStack: { $regex: new RegExp(q), $options: 'i' } },
      ],
    };
  }

  try {
    const companies = await companyModel.paginate(query, options);
    return response_200(res, 'OK', companies);
  } catch (err) {
    return response_500(res, err);
  }
};
