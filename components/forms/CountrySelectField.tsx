/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo } from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactCountryFlag from 'react-country-flag';
import countries from 'world-countries';

type CountrySelectProps = {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  required?: boolean;
};

type Country = {
  name: string;
  code: string;
};

const CountrySelect = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const countryOptions = useMemo<Country[]>(() => {
    return countries.map((country) => ({
      name: country.name.common,
      code: country.cca2,
    }));
  }, []);

  const selectedCountry = countryOptions.find(
    (country) => country.code === value
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between"
        >
          {selectedCountry ? (
            <span className="flex items-center gap-2">
              <ReactCountryFlag
                svg
                countryCode={selectedCountry.code}
                style={{ width: '1.25em', height: '1.25em' }}
              />
              <span>{selectedCountry.name}</span>
            </span>
          ) : (
            'Select your country...'
          )}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandList className="max-h-60">
            <CommandGroup>
              {countryOptions.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.name}
                  onSelect={() => {
                    onChange(country.code);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === country.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className="flex items-center gap-2">
                    <ReactCountryFlag
                      svg
                      countryCode={country.code}
                      style={{ width: '1.25em', height: '1.25em' }}
                    />
                    <span>{country.name}</span>
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export const CountrySelectField = ({
  name,
  label,
  control,
  error,
  required = false,
}: CountrySelectProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? `Please select ${label.toLowerCase()}` : false,
        }}
        render={({ field }) => (
          <CountrySelect value={field.value} onChange={field.onChange} />
        )}
      />

      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};














// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import { useState, useMemo } from 'react';
// import { Control, Controller, FieldError } from 'react-hook-form';
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from '@/components/ui/popover';
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from '@/components/ui/command';
// import { Button } from '@/components/ui/button';
// import { Label } from '@/components/ui/label';
// import { Check, ChevronsUpDown } from 'lucide-react';
// import { cn } from '@/lib/utils';
// import countryList from 'react-select-country-list';

// type CountrySelectProps = {
//   name: string;
//   label: string;
//   control: Control<any>;
//   error?: FieldError;
//   required?: boolean;
// };

// type Country = {
//   label: string;
//   value: string; // ISO-2 CODE
// };

// /** Convert ISO-2 country code to emoji flag */
// const getFlagEmoji = (code: string) =>
//   String.fromCodePoint(
//     ...code
//       .toUpperCase()
//       .split('')
//       .map(char => 127397 + char.charCodeAt(0))
//   );

// const CountrySelect = ({
//   value,
//   onChange,
// }: {
//   value?: string;
//   onChange: (value: string) => void;
// }) => {
//   const [open, setOpen] = useState(false);

//   /** ✅ FORCE ISO-2 CODES */
//   const countries = useMemo<Country[]>(() => {
//     return countryList()
//       .getData()
//       .map((country) => ({
//         label: country.label,
//         value: country.value.length === 2
//           ? country.value
//           : country.label.slice(0, 2).toUpperCase(),
//       }));
//   }, []);

//   const selectedCountry = countries.find(c => c.value === value);

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           className="w-full justify-between"
//         >
//           {selectedCountry ? (
//             <span className="flex items-center gap-2">
//               <span>{getFlagEmoji(selectedCountry.value)}</span>
//               <span>{selectedCountry.label}</span>
//             </span>
//           ) : (
//             'Select your country...'
//           )}
//           <ChevronsUpDown className="h-4 w-4 opacity-50" />
//         </Button>
//       </PopoverTrigger>

//       <PopoverContent className="w-full p-0">
//         <Command>
//           <CommandInput placeholder="Search country..." />
//           <CommandEmpty>No country found.</CommandEmpty>
//           <CommandList className="max-h-60">
//             <CommandGroup>
//               {countries.map((country) => (
//                 <CommandItem
//                   key={country.value}
//                   value={country.label}
//                   onSelect={() => {
//                     onChange(country.value);
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       'mr-2 h-4 w-4',
//                       value === country.value ? 'opacity-100' : 'opacity-0'
//                     )}
//                   />
//                   <span className="flex items-center gap-2">
//                     <span>{getFlagEmoji(country.value)}</span>
//                     <span>{country.label}</span>
//                   </span>
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export const CountrySelectField = ({
//   name,
//   label,
//   control,
//   error,
//   required = false,
// }: CountrySelectProps) => {
//   return (
//     <div className="space-y-2">
//       <Label>{label}</Label>

//       <Controller
//         name={name}
//         control={control}
//         rules={{
//           required: required ? `Please select ${label.toLowerCase()}` : false,
//         }}
//         render={({ field }) => (
//           <CountrySelect
//             value={field.value}
//             onChange={field.onChange}
//           />
//         )}
//       />

//       {error && <p className="text-sm text-red-500">{error.message}</p>}
//     </div>
//   );
// };
