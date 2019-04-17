import excitify from 'utils/excitify';

test('should make a string more excited', () => {
  const excitedString = excitify('Justin');
  expect(excitedString).toEqual('Justin!!!!!');
});
