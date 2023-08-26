import React, { useContext, useState, useEffect, useCallback } from 'react';

import DropDown, { IOption } from 'core-component/DropDown/DropDown';
import TextInput from 'core-component/TextInput/TextInput';
import Button from 'core-component/Button/Button';
import { HomeContext } from 'context/HomeContext';

import './SearchForm.css';

const COUNTRY_API_ENDPOINT = `${process.env.REACT_APP_COUNTRY_API_URL}`;
const INIT_FORM_DATA = {
  country: '',
  city: '',
};

function SearchForm() {
  const [listCountry, setListCountry] = useState<IOption[]>([]);
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const { getWeather, handleSetError, isError } = useContext(HomeContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const newData = {
      ...formData,
      city: formData.city.replace(/\s+/g, ' ').toLocaleLowerCase().trim(),
    };
    await getWeather(newData);
    setIsLoading(false);
  }, [formData]);

  const handleClearSearch = useCallback(() => {
    setFormData(INIT_FORM_DATA);
    handleSetError(false);
  }, []);

  useEffect(() => {
    const getListCountry = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(COUNTRY_API_ENDPOINT);
        const listCountry = await response.json();
        const customListCountry = listCountry.reduce(
          (acc: IOption[], cur: any) => {
            const country = {
              key: '',
              name: '',
            };
            country.key = cur?.cca2 || '';
            country.name = cur?.name?.common || '';

            acc.push(country);
            return acc;
          },
          []
        );

        setListCountry(customListCountry);
      } catch (err) {
        console.error(err);
      } finally {
      }
      setIsLoading(false);
    };

    getListCountry();
  }, []);

  const handleOnChange = useCallback(
    (name: string, value: string) => {
      setFormData({
        ...formData,
        [name]: value,
      });
      handleSetError(false);
    },
    [formData]
  );

  return (
    <div className='search-form-container'>
      <div className='search-form-content'>
        <div className='search-form'>
          <label className='search-form-label'>Country</label>
          <DropDown
            name='country'
            handleOnChange={handleOnChange}
            isDisabled={isLoading || !listCountry.length}
            options={listCountry}
            value={formData['country']}
          />
        </div>

        <div className='search-form'>
          <label className='search-form-label'> City</label>
          <TextInput
            name='city'
            value={formData['city']}
            isDisabled={isLoading}
            handleOnChange={handleOnChange}
          />
        </div>

        <div className='search-form-action'>
          <Button
            handleOnClick={handleSearch}
            label='Search'
            variant='primary'
            isLoading={isLoading}
            isDisabled={
              isLoading || !formData['city'].trim() || !formData['country']
            }
          />
          <Button
            handleOnClick={handleClearSearch}
            label='Clear'
            variant='default'
            isDisabled={isLoading}
          />
        </div>
      </div>

      {/* Error */}
      {isError && <div className='search-form-error'>Not found</div>}
    </div>
  );
}

export default React.memo(SearchForm);
