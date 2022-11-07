"use strict";
const { Image, Spot } = require("../models");
const images = [
  [
    "https://media.gettyimages.com/id/97671142/photo/a-general-view-of-the-exterior-of-cowboys-stadium-before-the-weigh-in-for-the-wbo-welterweight.jpg?s=612x612&w=0&k=20&c=cHCo_QfuEFS-Uo4ccWpeIRS8POfy6Fzq9qBL0qx6on4=",
    "https://media.gettyimages.com/id/89994566/photo/the-dallas-cowboys-take-on-the-tennessee-titans-in-the-second-quarter-during-a-preseason-game.jpg?s=612x612&w=0&k=20&c=qNnFequM-S2etLfMmupyN2nBninwFTqKC4_YU7pb3NU=",
    "https://media.gettyimages.com/id/91124521/photo/the-cowboys-star-is-revealed-on-the-field-before-a-game-between-the-new-york-giants-and-the.jpg?s=612x612&w=0&k=20&c=ifwoW3CqTQZex97Ydlp1nKILNYTLqFE-9W4glyI0VaA=",
    "https://media.gettyimages.com/id/91468358/photo/general-view-of-cowboys-stadium-and-scoreboard-before-a-game-between-the-dallas-cowboys-and-the.jpg?s=612x612&w=0&k=20&c=sg_VkB7kUhzR8kq0sn1HYNgIMI-x8BlcXNsK8Xg8joM=",
    "https://media.gettyimages.com/id/85982235/photo/dallas-cowboys-stadium-during-contruction-on-april-13-2009-in-arlington-texas.jpg?s=612x612&w=0&k=20&c=UMLAqNqbzGsUUpCbpepZGQXFSAFyuymoVcy1ByQOPJY=",
  ],
  [
    "https://media.gettyimages.com/id/1168725826/photo/architects-hok-tvdesign-goode-van-slyke-and-stanley-beaman-sears-mercedes-benz-stadium-home.jpg?s=612x612&w=0&k=20&c=KC6vFK0PZHtQrXgipWUcVgipEoK8CMb15lVh7bF4Scc=",
    "https://media.gettyimages.com/id/1217930300/photo/a-view-of-mercedes-benz-stadium-as-it-is-lit-up-with-blue-lights-on-april-09-2020-in-atlanta.jpg?s=612x612&w=0&k=20&c=UMMtUVzhetLDzjEDvqUisZ89XmWEQMPlTs6SdZ2zAAU=",
    "https://media.gettyimages.com/id/1127209149/photo/fireworks-shoot-in-the-air-above-mercedes-benz-stadium-during-halftime-of-super-bowl-liii.jpg?s=612x612&w=0&k=20&c=pGX2TG5TshNnGpL1Yf9KOLVH6WN1saYGpWO964Gx3AY=",
    "https://media.gettyimages.com/id/1168224251/photo/mercedes-benz-stadium-home-of-the-atlanta-falcons-football-team-and-atlanta-united-fc-soccer.jpg?s=612x612&w=0&k=20&c=XwzkwOspHYAF1wWAQiEDiCnlco7CN1nVLJkEXHFZNME=",
    "https://media.gettyimages.com/id/1168723918/photo/architects-hok-tvdesign-goode-van-slyke-and-stanley-beaman-sears-mercedes-benz-stadium-home.jpg?s=612x612&w=0&k=20&c=ikd9-Rclb-TFV88cmMBg7kvaWtpoAcwilUXtRxp_Glw=",
  ],
  [
    "https://media.gettyimages.com/id/71715468/photo/the-repaired-louisiana-superdome-and-city-skyline-are-seen-august-25-2006-in-new-orleans.jpg?s=612x612&w=0&k=20&c=DWFTZ--q8H7rONMF-lLPQGJ_vQaeYI5vBVIPV1Fxb88=",
    "https://media.gettyimages.com/id/54210245/photo/stranded-victims-of-hurricane-katrina-rest-inside-the-superdome-september-2-2005-in-new-orleans.jpg?s=612x612&w=0&k=20&c=nZqO021ONnPQYUTC0En41GmKRYF01lZlwxgNLytBHk8=",
    "https://media.gettyimages.com/id/92618793/photo/an-exterior-view-of-the-louisiana-superdome-is-seen-before-the-start-of-the-game-between-the.jpg?s=612x612&w=0&k=20&c=wk1aR7k3V286cQSMlHiMH6r5FXNdw1NuqFV31E14BmE=",
    "https://media.gettyimages.com/id/174416471/photo/exterior-view-of-the-superdome-stadium-in-new-orleans-as-it-neared-completion-new-orleans.jpg?s=612x612&w=0&k=20&c=RHyEtMrf0M_2lz4Cn_PrASR6OsbrSCVcH8TAMSWy338=",
    "https://media.gettyimages.com/id/51377477/photo/general-view-of-the-louisiana-superdome-during-the-game-between-the-new-orleans-saints-and-the.jpg?s=612x612&w=0&k=20&c=5fsQ2hMg6yoafDI3OGRqtcAGrGeVPort0FTdi4e-WI0=",
  ],
  [
    "https://media.gettyimages.com/id/82746988/photo/a-general-view-of-the-exterior-of-lucas-oil-stadium-prior-to-the-nfl-game-between-the-chicago.jpg?s=612x612&w=0&k=20&c=xQZqZbmSdxRylycZ1D4rwW9lx9aJ_9tc8eVTCmgFlMg=",
    "https://media.gettyimages.com/id/468266638/photo/lucas-oil-stadium-home-of-the-2015-final-four-is-seen-on-march-31-2015-in-indianapolis-indiana.jpg?s=612x612&w=0&k=20&c=gR76vGBaq2X_r8H2LF3WAk6WiHOuESBp_2zUMVEtOd8=",
    "https://media.gettyimages.com/id/138888373/photo/a-general-view-stephen-gostkowski-of-the-new-england-patriots-kicking-off-to-start-the-game.jpg?s=612x612&w=0&k=20&c=8nZ_B7z0V6CLTSl4FRp136ZHYVZfeBImSO0OVAzuCmA=",
    "https://media.gettyimages.com/id/98409039/photo/a-general-view-of-the-butler-bulldogs-playing-against-the-duke-blue-devils-during-the-2010-ncaa.jpg?s=612x612&w=0&k=20&c=qE3NXSOdgKAhQuZqeqMvLstSfuwimPQpnkQsVUVmtGY=",
    "https://media.gettyimages.com/id/503374800/photo/panoramic-view-of-lucas-oil-stadium-home-of-the-indianapolis-colts-football-team-on-december.jpg?s=612x612&w=0&k=20&c=w1x1Tm1lx6yKubZdM0l3643GqRU6hFhHcbYd9qKy4Hs=",
  ],
  [
    "https://media.gettyimages.com/id/151294135/photo/metlife-stadium-is-seen-prior-to-the-2012-nfl-season-opener-between-the-new-york-giants-and.jpg?s=612x612&w=0&k=20&c=jScbWm3vtlg-SeTb0kJTfE_FYXPJ0ea-y2vkdpRFVg4=",
    "https://media.gettyimages.com/id/104023508/photo/a-general-view-of-the-openeing-kick-off-at-the-new-meadowlands-stadium-between-the-carolina.jpg?s=612x612&w=0&k=20&c=u3r3I1f7Rc7PbCBoN46OdtOzofazf7Xv2LtT7eyu-Kc=",
    "https://media.gettyimages.com/id/466635719/photo/fireworks-erupt-over-metlife-stadium-ahead-of-super-bowl-xlviii-between-the-seattle-seahawks.jpg?s=612x612&w=0&k=20&c=LykX0s2dgOPo4K56-jqHWxxf-hdQOP6xvEcXz-7bOeQ=",
    "https://media.gettyimages.com/id/1217938564/photo/metlife-stadium-is-illuminated-in-blue-to-honor-essential-workers-on-april-09-2020-in-east.jpg?s=612x612&w=0&k=20&c=hN0TtQSBYMvkDZBTumNE_W_X3YmbLQiPRjoYNUfGGCM=",
    "https://media.gettyimages.com/id/602422458/photo/fans-hold-an-american-flag-during-the-national-anthem-prior-to-the-game-between-the-new-york.jpg?s=612x612&w=0&k=20&c=pW5tnFVCwLZpN2dX8nHEXc2gpL7Lg5NChvwiklHZLZk=",
  ],
  [
    "https://media.gettyimages.com/id/80822924/photo/a-general-view-of-the-start-of-game-five-of-the-2008-nhl-stanley-cup-playoffs-eastern.jpg?s=612x612&w=0&k=20&c=I73xvIPD-IEBO1vGoP8slZggv_HwfPBJ5WrUJBpGo2A=",
    "https://media.gettyimages.com/id/80372712/photo/an-ice-level-general-view-of-bell-centre-is-shown-before-the-boston-bruins-game-against-the.jpg?s=612x612&w=0&k=20&c=BI0Yfhnhj8Aw0i2QKXQwaaAFR4xRwuugxVLmtyvDZ64=",
    "https://media.gettyimages.com/id/100025802/photo/general-view-of-fans-and-players-stand-at-attention-as-canadas-national-anthem-is-performed.jpg?s=612x612&w=0&k=20&c=mQK5m5POEzFk7QySRIvRkOAnNif22JbhxJqrkpUfFiw=",
    "https://media.gettyimages.com/id/1326708283/photo/fans-cheer-prior-to-game-three-of-the-2021-nhl-stanley-cup-final-between-the-tampa-bay.jpg?s=612x612&w=0&k=20&c=RZ5e24eP2_Ie5cWPxXHJpEZjp-Bd3Vlel0cAjGCmpss=",
    "https://media.gettyimages.com/id/72974345/photo/a-general-view-of-the-bell-centre-is-seen-as-the-montreal-canadiens-take-on-the-philadelphia.jpg?s=612x612&w=0&k=20&c=MgqR8vqwv81e8HRfPmUDvXbV90YoI4pxXkBSopmT-uM=",
  ],
];

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let i = 0; i < images.length; i++) {
      let pack = images[i];
      const theSpot = await Spot.findOne({
        where: {
          id: i + 1,
        },
      });
      for (let j = 0; j < pack.length; j++) {
        let url = pack[j];
        await Image.create({
          imageableId: theSpot.id,
          imageableType: "Spot",
          url,
          userId: theSpot.ownerId,
        });
      }
    }

    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
