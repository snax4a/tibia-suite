const tabletojson = require('tabletojson').Tabletojson

const getCharacter = require('../../../src/lib/getCharacter')
const basicUser = require('../../stubs/basicUser.json')
const complexUser = require('../../stubs/complexUser.json')

jest.mock('tabletojson')

describe('getCharacter', () => {
  it('get basic character info', async () => {
    tabletojson.convertUrl.mockResolvedValue(basicUser)

    const user = await getCharacter('User')
    expect(user.characterInfo).toStrictEqual({
      name: 'User',
      title: 'None (0 titles unlocked)',
      sex: 'male',
      vocation: 'Druid',
      level: '24',
      achievementPoints: '0',
      world: 'Quintera',
      residence: 'Thais',
      lastLogin: 'Aug 26 2012, 07:34:49 CEST',
      accountStatus: 'Free Account'
    })
  })

  describe('get extra info', () => {
    it('get achievements', async () => {
      tabletojson.convertUrl.mockResolvedValue(complexUser)
      const user = await getCharacter('Momzo')

      expect(user.achievements).toStrictEqual(['Demonbane', 'High Inquisitor', 'Life on the Streets', 'Warlock'])
    })

    it('get deaths', async () => {
      tabletojson.convertUrl.mockResolvedValue(complexUser)
      const user = await getCharacter('Momzo')

      expect(user.deaths).toStrictEqual([{
        date: 'Jun 03 2020, 12:35:37 CEST',
        description: 'Slain at Level 478 by Elder Nexid, Rookie Legend, Zdechly Slon, Elder Piatek, Zwariowany Peker, Dran Yunel, Mentalnaaa Paskudaaa and Apoloribad Tarashaja.'
      }])
    })

    it('get account info', async () => {
      tabletojson.convertUrl.mockResolvedValue(complexUser)
      const user = await getCharacter('Momzo')

      expect(user.accountInfo).toStrictEqual({
        loyaltyTitle: 'Squire of Tibia',
        created: 'Oct 04 2014, 09:49:11 CEST'
      })
    })

    it('get characters', async () => {
      tabletojson.convertUrl.mockResolvedValue(complexUser)
      const user = await getCharacter('Momzo')

      expect(user.characters).toStrictEqual([
        { name: '1. Pochedero', world: 'Estela' },
        { name: '2. Poduszka', world: 'Peloria' },
        { name: '3. Skyvex', world: 'Estela' },
        { name: '4. Thaz boi', world: 'Tournament - restricted Store' },
        { name: '5. Thaz The Reincarnated', world: 'Peloria' },
        { name: '6. Zdechly Slon', world: 'Antica' }
      ])
    })
  })
})
