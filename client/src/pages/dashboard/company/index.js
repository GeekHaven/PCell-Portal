import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
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
import { getPaginatedCompanies } from '@/utils/API/company';
import { useMutation } from 'react-query';
import { previewData } from 'next/dist/client/components/headers';

const AllCompanies = () => {
  const router = useRouter();
  const [sort, setSort] = useState(1);
  const [onlyEligible, setOnlyEligible] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [companyData, setCompanyData] = useState([]);

  const searchMutation = useMutation(getPaginatedCompanies, {
    onSuccess: (data) => {
      setCompanyData(data);
    },
  });

  const handleSearch = () => {
    searchMutation.mutate({
      onlyEligible,
      sort,
      search,
      sortBy,
      page: page,
      limit: limit,
    });
  };

  useEffect(() => {
    handleSearch();
  }, [onlyEligible, sort, sortBy, page, limit]);

  return (
    <>
      <Paper
        elevation={2}
        className="py-4 px-4 mb-4 flex md:flex-row flex-col gap-4 md:gap-2 md:items-center"
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
              <MenuItem value={'isEligible'}>Eligibility</MenuItem>
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
          <FormControlLabel
            className=" w-fit"
            label="Eligible"
            control={
              <Checkbox
                checked={onlyEligible}
                onChange={(e) => {
                  setOnlyEligible(e.target.checked);
                }}
              />
            }
          />
        </div>
      </Paper>
      {searchMutation.isLoading ? (
        <Container className="h-96 w-full flex justify-center items-center">
          <CircularProgress />
        </Container>
      ) : (
        <Container
          className="grid gap-2 grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
          maxWidth="xl"
        >
          {companyData?.docs?.map((company) => (
            <Button
              variant="outlined"
              disabled={!company.isEligible}
              className="px-2 w-full h-full"
              sx={{
                outlineColor: 'secondary.main',
                opacity: company.isEligible ? 1 : 0.7,
              }}
              onClick={() => {
                router.push(`/dashboard/company/${company._id}`);
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
                    label={company.currentStatus}
                    sx={{
                      textTransform: 'capitalize',
                    }}
                    size="small"
                    variant="outlined"
                    color={
                      company.currentStatus === 'registration open'
                        ? 'secondary'
                        : company.currentStatus === 'registration closed'
                        ? 'warning'
                        : company.currentStatus === 'shortlisting'
                        ? 'info'
                        : 'success'
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
        </Container>
      )}
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
    </>
  );
};
AllCompanies.fullWidth = true;
export default AllCompanies;
