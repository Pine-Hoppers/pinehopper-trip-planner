import React, { useState } from 'react';
import history from '../history';
import { connect } from 'react-redux';
import SuggestedParks from './SuggestedParks';

// Material UI Autocomplete
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Joyride, { STATUS } from 'react-joyride';

const nationalParks = [
  { parkName: 'Acadia National Park', parkCode: 'acad' },
  { parkName: 'Arches National Park', parkCode: 'arch' },
  { parkName: 'Badlands National Park', parkCode: 'badl' },
  { parkName: 'Big Bend National Park', parkCode: 'bibe' },
  { parkName: 'Biscayne National Park', parkCode: 'bisc' },
  { parkName: 'Black Canyon of the Gunnison National Park', parkCode: 'blca' },
  { parkName: 'Bryce Canyon National Park', parkCode: 'brca' },
  { parkName: 'Canyonlands National Park', parkCode: 'cany' },
  { parkName: 'Capitol Reef National Park', parkCode: 'care' },
  { parkName: 'Carlsbad Caverns National Park', parkCode: 'cave' },
  { parkName: 'Channel Islands National Park', parkCode: 'chis' },
  { parkName: 'Congaree National Park', parkCode: 'cong' },
  { parkName: 'Crater Lake National Park', parkCode: 'crla' },
  { parkName: 'Cuyahoga Valley National Park', parkCode: 'cuva' },
  { parkName: 'Death Valley National Park', parkCode: 'deva' },
  { parkName: 'Denali National Park', parkCode: 'dena' },
  { parkName: 'Dry Tortugas National Park', parkCode: 'drto' },
  { parkName: 'Everglades National Park', parkCode: 'ever' },
  { parkName: 'Gates of the Arctic National Park', parkCode: 'gaar' },
  { parkName: 'Gateway Arch National Park', parkCode: 'jeff' },
  { parkName: 'Glacier Bay National Park', parkCode: 'glba' },
  { parkName: 'Glacier National Park', parkCode: 'glac' },
  { parkName: 'Grand Canyon National Park', parkCode: 'grca' },
  { parkName: 'Grand Teton National Park', parkCode: 'grte' },
  { parkName: 'Great Basin National Park', parkCode: 'grba' },
  { parkName: 'Great Sand Dunes National Park', parkCode: 'grsa' },
  { parkName: 'Great Smoky Mountains National Park', parkCode: 'grsm' },
  { parkName: 'Guadalupe Mountains National Park', parkCode: 'gumo' },
  { parkName: 'Haleakalā National Park', parkCode: 'hale' },
  { parkName: "Hawai'i Volcanoes National Park", parkCode: 'havo' },
  { parkName: 'Hot Springs National Park', parkCode: 'hosp' },
  { parkName: 'Indiana Dunes National Park', parkCode: 'indu' },
  { parkName: 'Isle Royale National Park', parkCode: 'isro' },
  { parkName: 'Joshua Tree National Park', parkCode: 'jotr' },
  { parkName: 'Katmai National Park', parkCode: 'katm' },
  { parkName: 'Kenai Fjords National Park', parkCode: 'kefj' },
  { parkName: 'Kobuk Valley National Park', parkCode: 'kova' },
  { parkName: 'Lake Clark National Park', parkCode: 'lacl' },
  { parkName: 'Lassen Volcanic National Park', parkCode: 'lavo' },
  { parkName: 'Mammoth Cave National Park', parkCode: 'maca' },
  { parkName: 'Mesa Verde National Park', parkCode: 'meve' },
  { parkName: 'Mount Rainier National Park', parkCode: 'mora' },
  { parkName: 'National Park of American Samoa', parkCode: 'npsa' },
  { parkName: 'New River Gorge National Park and Preserve', parkCode: 'neri' },
  { parkName: 'North Cascades National Park', parkCode: 'noca' },
  { parkName: 'Olympic National Park', parkCode: 'olym' },
  { parkName: 'Petrified Forest National Park', parkCode: 'pefo' },
  { parkName: 'Pinnacles National Park', parkCode: 'pinn' },
  { parkName: 'Redwood National Park', parkCode: 'redw' },
  { parkName: 'Rocky Mountain National Park', parkCode: 'romo' },
  { parkName: 'Saguaro National Park', parkCode: 'sagu' },
  { parkName: 'Sequoia & Kings Canyon National Parks', parkCode: 'seki' },
  { parkName: 'Shenandoah National Park', parkCode: 'shen' },
  { parkName: 'Theodore Roosevelt National Park', parkCode: 'thro' },
  { parkName: 'Virgin Islands National Park', parkCode: 'viis' },
  { parkName: 'Voyageurs National Park', parkCode: 'voya' },
  { parkName: 'White Sands National Park', parkCode: 'whsa' },
  { parkName: 'Wind Cave National Park', parkCode: 'wica' },
  { parkName: 'Wrangell-St. Elias National Park', parkCode: 'wrst' },
  { parkName: 'Yellowstone National Park', parkCode: 'yell' },
  { parkName: 'Yosemite National Park', parkCode: 'yose' },
  { parkName: 'Zion National Park', parkCode: 'zion' },
];

const useStyles = makeStyles(() => ({
  root: {
    '&.Mui-focused .MuiInputLabel-outlined': {
      color: '#fdf9ec',
    },
  },
  inputRoot: {
    color: '#fdf9ec',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fffdf8',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#DAD7CD',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#fdf9ec',
    },
  },
  clearIndicator: {
    color: '#fffdf8',
  },
  popupIndicator: {
    color: '#fffdf8',
  },
}));

// COMPONENT
export const Explore = (props) => {
  const [{ run, steps }, setState] = useState({
    run: !localStorage.getItem('exploreTourComplete'),
    steps: [
      {
        target: '.my-first-step',
        content: 'Select a national park to begin exploring!',
      },
      {
        target: '#suggested-parks',
        content: 'Or check out our suggested parks!',
      },
      {
        target: '.yellowstone-activities',
        content:
          'Click on See Activities to see the park details and activities.',
      },
    ],
  });
  const classes = useStyles();

  const options = nationalParks.map((option) => {
    const firstLetter = option.parkName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setState({ run: false });
    }
    if (data.action === 'reset') {
      localStorage.setItem('exploreTourComplete', true);
    }
  };

  return (
    <main>
      <Joyride
        run={run}
        callback={handleJoyrideCallback}
        steps={steps}
        hideCloseButton={true}
        showProgress
        continuous
      />
      <section id="explore">
        <h3>EXPLORE</h3>
        <div className="explore-page">
          <Autocomplete
            id="grouped-demo"
            classes={classes}
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.parkName}
            getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            onChange={async (event, newValue) => {
              if (newValue !== null) {
                setTimeout(() => {
                  history.push(`/explore/${newValue.parkCode}/activities`);
                }, 450);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a national park..."
                variant="outlined"
                InputLabelProps={{
                  style: { color: '#fffdf8' },
                }}
                className="my-first-step"
              />
            )}
          />
        </div>
      </section>

      <section id="suggestions">
        <h4>SUGGESTED PARKS:</h4>
        <SuggestedParks />
      </section>
    </main>
  );
};

// CONTAINER
const mapState = (state) => {
  return {
    firstName: state.auth.firstName,
  };
};

export default connect(mapState)(Explore);
