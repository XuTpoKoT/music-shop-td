import React from 'react';
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  FormGroup,
  Checkbox
} from "@mui/material";
import { RequestStatus } from '@/dto/RequestState';
import { CategoryResponse } from '@/dto/CategoryResponse';
import { FiltersStyle, CategoriesStyle } from '@/style/style';
import { ManufacturerResponse } from '@/dto/ManufacturerResponse';

const FiltersView = (props: {
  status: RequestStatus,
  categories: CategoryResponse[] | null,
  selectedCategoryId: string | undefined,
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void,

  manufacturers: ManufacturerResponse[], // список всех производителей
  selectedManufacturers: string[], // выбранные производители
  handleManufacturerChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}) => {
  const {
    status,
    categories,
    selectedCategoryId,
    handleCategoryChange,
    manufacturers,
    selectedManufacturers,
    handleManufacturerChange
  } = props;

  if (status === RequestStatus.Idle || status === RequestStatus.Loading) {
    return <div>Загрузка...</div>;
  }

  if (status === RequestStatus.Error) {
    return <div>Ошибка загрузки данных</div>;
  }

  return (
    <Box sx={FiltersStyle}>
      {/* Категории */}
      <Box sx={CategoriesStyle}>
        <Typography sx={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>
          Категории
        </Typography>
        <RadioGroup defaultValue={selectedCategoryId || ""} onChange={handleCategoryChange}>
          <FormControlLabel key="all" value="" control={<Radio />} label="Все" />
          {categories?.map(category => (
            <FormControlLabel
              key={category.id}
              value={category.id}
              control={<Radio />}
              label={category.name}
            />
          ))}
        </RadioGroup>
      </Box>

      {/* Производители */}
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ fontFamily: 'Arial, sans-serif', fontSize: '24px' }}>
            Производители
        </Typography>
        {/* <FormGroup>
            {manufacturers?.length ? (
                manufacturers.map(manufacturer => (
                <FormControlLabel
                    key={manufacturer.id}
                    control={
                    <Checkbox
                        checked={selectedManufacturers.includes(manufacturer.id)}
                        onChange={handleManufacturerChange}
                        value={manufacturer.id}
                    />
                    }
                    label={manufacturer.name}
                />
                ))
            ) : (
                <div>Производители не загружены</div>
            )}
        </FormGroup> */}
        </Box>
    </Box>
    );
};

export default FiltersView;
