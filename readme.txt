BUGS:
     - Had to refresh after making a comment to see it. Perhaps not being
       rendered before redirect.
        - Does not always occur, not sure if still occurring or unknown chance,
          need to test.
          - Happened again.

    - member since: [5/1/118] should be [6/25/18]

    - on new comment page, says 'Add new comment to'
TODO:



Implement a more minimalist color scheme,
mute backgrounds with color for emphasis

implement community rating

implement save post

implement save user

implement basic filters

implement search for user

consider adding badges below the 1st div in card-body
for condition













































































    NOTES


6-3 -> 6.4
    Need to remove items_posted once deleted
        Breakdown of problem:
            -Each instance of the user model contains an array
             of items called items_posted.
            -When a user adds an item, that item's _id is added
             to the items_posted array.
            -Those _id's are populated in index.js and their information
             is displayed on the profile page.
            -When a user's post is deleted in post.js, the _id of said
             post is not deleted from the items_posted array of that user's
             instance of the User model.
        Solution process:
            + Access the items_posted array
              of the user who owns the post.
               - Accessed the array of id's
                 and found the index of the
                 desired post, but it says
                 that the array does not
                 include the id, even when
                 it does.
               - Perhaps there is a type
                 error with the id's, i need to
                 find the user and then alter it
                 directly and see what that does.
                    + This was the solution I used.
6.4
    Login authorization denial doesn't redirect
        My solution was to fix some typos.
