import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | list rentals');

test('should redirect to rentals route', (assert) => {
  visit('/');
  andThen(() => {
    assert.equal(currentURL(), '/rentals', 'shourld redirect automatically');
  })
});

test('should list available rentals', (assert) => {
  visit('/');
  andThen(() => {
    assert.equal(find('.listing').length, 3, 'should see 3 listings');
  })
});

test('should link to information about the company.', (assert) => {
  visit('/');
  click('a:contains("About")');
  andThen(() => {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  })
});

test('should link to contact information.', (assert) => {
  visit('/');
  click('a:contains("Contact")');
  andThen(() => {
    assert.equal(currentURL(),'/contact', 'should navigate to contact');
  })
});

test('should filter the list of rentals by city.', (assert) => {
  visit('/');
  fillIn('.list-filter input', 'seattle');
  keyEvent('.list-filter input', 'keyup', 69);
  andThen(() => {
    assert.equal(find('.listing').length, 1, 'should show 1 listing');
    assert.equal(find('.listing .location:contains("Seattle")').length, 1, 'should contain 1 listing with location Seattle');
  })
});

test('should show details for a specific rental.', (assert) => {
  visit('/rentals');
  click('a:contains("Grand Old Mansion")');
  andThen(() => {
    assert.equal(currentURL(), 'rentals/grand-old-mansion', 'should navigate to show route');
    assert.equal(find('.show-listing h2').text(), "Grand Old Mansion", 'should list rental title');
    assert.equal(find('.description').length, 1, 'should list a description of the property');
  });
});
