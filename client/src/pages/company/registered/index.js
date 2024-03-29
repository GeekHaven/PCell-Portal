import {
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Container } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { getRegisteredCompanies } from '@/utils/API/company';
import { useMutation, useQuery } from 'react-query';
import { useNotOnRenderUseEffect } from '@/customHooks/useNotOnRenderUseEffect';

const AllCompanies = () => {
  const router = useRouter();
  const [sort, setSort] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [companyData, setCompanyData] = useState([]);

  const searchMutation = useMutation(getRegisteredCompanies, {
    onSuccess: (data) => {
      setCompanyData(data);
    },
  });

  const handleSearch = () => {
    searchMutation.mutate({
      sort,
      search,
      sortBy,
      page: page,
      limit: limit,
    });
  };

  const query = useQuery(
    ['getRegisteredCompanies', 'user'],
    () => getRegisteredCompanies({ sort, search, sortBy, page, limit }),
    {
      onSuccess: (data) => {
        setCompanyData(data);
      },
      staleTime: 1000 * 60 * 5,
    }
  );

  useEffect(() => {
    setCompanyData(query.data);
  }, [query.data]);

  useNotOnRenderUseEffect(() => {
    handleSearch();
  }, [sort, sortBy, page, limit]);

  return (
    <>
      <Typography variant="subtitle1" className="-mt-2" color="primary">
        Registered Companies
      </Typography>
      <Divider className="mb-4 mt-2" />
      <Paper
        elevation={2}
        className="p-2 mb-4 flex md:flex-row flex-col gap-4 md:gap-2 md:items-center"
      >
        <div className="flex flex-nowrap flex-grow w-full">
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            className="flex-grow mr-1"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <IconButton
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '8px',
              marginRight: '4px',
            }}
            onClick={handleSearch}
          >
            <SearchIcon />
          </IconButton>
        </div>
        <div className="flex md:flex-nowrap items-center justify-start gap-0 flex-grow md:flex-grow-0 w-full md:w-fit flex-wrap">
          <FormControl className="w-28" size="small">
            <InputLabel id="sortByUi">Sort By</InputLabel>
            <Select
              labelId="sortByUi"
              id="sortBy"
              value={sortBy}
              label="Sort By"
              onChange={(e) => {
                setSortBy(e.target.value);
              }}
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'status'}>Status</MenuItem>
            </Select>
          </FormControl>
          <div className="flex flex-nowrap justify-center items-center mx-2">
            <Tooltip title="Sort">
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => {
                  setSort(sort === 1 ? -1 : 1);
                }}
              >
                {sort === 1 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </Paper>
      {query.isLoading || searchMutation.isLoading ? (
        <Container className="h-96 w-full flex justify-center items-center">
          <CircularProgress />
        </Container>
      ) : (
        <div className="grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] p-0">
          {companyData?.docs?.map((company) => (
            <Button
              variant="outlined"
              className="px-2 w-full h-full"
              sx={{
                outlineColor: 'secondary.main',
              }}
              onClick={() => {
                router.push(`/company/individual/${company._id}`);
              }}
              key={company._id}
            >
              <div className="flex flex-nowrap gap-2 items-center justify-center w-full">
                <div className="bg-white rounded-md">
                  <img
                    className={`p-0 rounded-md object-contain object-center aspect-square`}
                    alt={company.name}
                    src={company.logo}
                    height={100}
                    width={100}
                  />
                </div>

                <Divider orientation="vertical" flexItem />
                <div className="flex-grow mx-auto">
                  <Typography
                    color="primary"
                    variant="h6"
                    className="text-center mb-2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'capitalize',
                    }}
                  >
                    {company.name}
                  </Typography>
                  <Chip
                    label={
                      company.currentStatus === 'completed' &&
                      company.userStatus !== 'selected'
                        ? 'rejected'
                        : company.userStatus
                    }
                    sx={{
                      textTransform: 'capitalize',
                    }}
                    size="small"
                    variant="outlined"
                    color={
                      company.userStatus === 'registered'
                        ? 'primary'
                        : company.userStatus === 'shortlisted'
                        ? 'info'
                        : company.userStatus === 'selected'
                        ? 'success'
                        : company.currentStatus === 'completed'
                        ? 'error'
                        : 'warning'
                    }
                    icon={
                      <FiberManualRecordTwoToneIcon
                        sx={{
                          fontSize: '1rem',
                        }}
                      />
                    }
                  />
                </div>
              </div>
            </Button>
          ))}
        </div>
      )}
      {companyData?.totalDocs > 0 && (
        <Container className="flex justify-center items-center py-4">
          <Pagination
            shape="rounded"
            color="primary"
            variant="outlined"
            boundaryCount={2}
            count={companyData.totalPages}
            hideNextButton={!companyData.hasNextPage}
            hidePrevButton={!companyData.hasPrevPage}
            page={page}
            onChange={(event, page) => {
              setPage(page);
            }}
            hidden={companyData.totalPages === 1}
          />
        </Container>
      )}
    </>
  );
};
AllCompanies.fullWidth = true;
export default AllCompanies;
