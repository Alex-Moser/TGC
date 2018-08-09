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




fixed position Left side menu (doesnt scroll)











<div class="container-fluid">
    <!-- Index of Posts -->
    <div class="post-index-c col-9">
        <div class="row">
            <% posts.forEach(function(post){ %>
                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12">
                    <!--// Posts -->
                    <div class="card index-card">
                        <img src="<%= post.image %>">

                        <div class="card-body">
                            <!-- Short description of what is being sold -->
                            <div><%= post.title %></div>

                            <!-- States who made post and links to their profile -->
                            <div>
                                <span class="posted-by"> posted by:</span>
                                <a href="/profile/<%= post.seller.id %>" class="author-link">
                                    <%= post.seller.username %>
                                </a>
                            </div>

                            <!-- Section for the More Info button and price info -->
                            <div class="index2-card-footer">
                                <!-- More info button -->
                                <a href="/posts/<%= post._id %>"
                                class="btn btn-white-g">More Info</a>

                                <!-- Price display -->
                                <span class="index-price">
                                     $69.97
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            <% }); %>
        </div>
    </div>
</div>









































































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
