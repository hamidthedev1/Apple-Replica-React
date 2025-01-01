import React from 'react'
import Alert from './Alert/Alert'
import FirstSection from './FirstSection/FirstSection'
import SecondSection from './SecondSection/SecondSection'
import ThirdSection from './ThirdSection/ThirdSection'
import FifthSection from './FifthSection/FifthSection'
import FourthSection from './FourthSection/FourthSection'
import SixthSection from './SixthSection/SixthSection'
import YoutubeVideos from './YoutubeVideos/YoutubeVideos'

function Main() {
  return (
    <div>
      <Alert />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <FifthSection />
      <SixthSection />
      <YoutubeVideos/>

    </div>
  );
}

export default Main