# Movie Tracking App

A React + Vite app for browsing movies and TV shows. Users can discover content, filter by year, genre, and country, and see recommendations on movie pages. TV shows display episode info and stills. Styled with Tailwind and powered by TMDb & OMDb APIs.

## Features

- Discover movies and TV shows
- Filter by year, genre, and country
- Recommendations on movie pages
- Episode info and stills for TV shows
- Responsive design with Tailwind CSS

## Run Locally

```bash
git clone <your-repo-url>
cd <your-repo-folder>
npm install
npm start

```

Movieport
├─ backend
│ └─ Movieport
│ ├─ Accounts
│ │ ├─ admin.py
│ │ ├─ apps.py
│ │ ├─ migrations
│ │ │ ├─ 0001_initial.py
│ │ │ └─ **init**.py
│ │ ├─ models.py
│ │ ├─ serializers.py
│ │ ├─ tests.py
│ │ ├─ urls.py
│ │ ├─ views.py
│ │ └─ **init**.py
│ ├─ Activity
│ │ ├─ admin.py
│ │ ├─ apps.py
│ │ ├─ migrations
│ │ │ └─ **init**.py
│ │ ├─ models.py
│ │ ├─ serializers.py
│ │ ├─ tests.py
│ │ ├─ views.py
│ │ └─ **init**.py
│ ├─ ContentRelations
│ │ ├─ admin.py
│ │ ├─ apps.py
│ │ ├─ migrations
│ │ │ ├─ 0001_initial.py
│ │ │ ├─ 0002_contentrelations_rating.py
│ │ │ ├─ 0003_rename_likes_contentrelations_liked_and_more.py
│ │ │ └─ **init**.py
│ │ ├─ models.py
│ │ ├─ serializers.py
│ │ ├─ tests.py
│ │ ├─ urls.py
│ │ ├─ views.py
│ │ └─ **init**.py
│ ├─ db.sqlite3
│ ├─ Lists
│ │ ├─ admin.py
│ │ ├─ apps.py
│ │ ├─ Forms.py
│ │ ├─ migrations
│ │ │ ├─ 0001_initial.py
│ │ │ ├─ 0002_lists_likes.py
│ │ │ └─ **init**.py
│ │ ├─ models.py
│ │ ├─ serializers.py
│ │ ├─ tests.py
│ │ ├─ urls.py
│ │ ├─ views.py
│ │ └─ **init**.py
│ ├─ manage.py
│ └─ Movieport
│ ├─ asgi.py
│ ├─ settings
│ │ ├─ base.py
│ │ ├─ dev.py
│ │ ├─ prod.py
│ │ └─ **init**.py
│ ├─ urls.py
│ └─ wsgi.py
├─ frontend
│ ├─ .prettierignore
│ ├─ eslint.config.js
│ ├─ index.html
│ ├─ package-lock.json
│ ├─ package.json
│ ├─ postcss.config.mjs
│ ├─ public
│ │ ├─ assets
│ │ │ ├─ alien.svg
│ │ │ ├─ drug-svgrepo-com.svg
│ │ │ ├─ imdb.svg
│ │ │ ├─ lightHouse.gif
│ │ │ ├─ lightHouseSm.gif
│ │ │ ├─ pills.svg
│ │ │ ├─ siab.gif
│ │ │ └─ vite.svg
│ │ └─ \_redirects
│ ├─ src
│ │ ├─ api
│ │ │ ├─ account
│ │ │ │ ├─ auth
│ │ │ │ │ ├─ AuthContext.js
│ │ │ │ │ ├─ AuthProvider.jsx
│ │ │ │ │ ├─ checkAuth.js
│ │ │ │ │ └─ ensureCsrf.js
│ │ │ │ ├─ profile
│ │ │ │ │ └─ useGetUserByUsername.js
│ │ │ │ ├─ RegisterUser.js
│ │ │ │ ├─ useLoginUser.js
│ │ │ │ └─ useLogoutUser.js
│ │ │ ├─ activity
│ │ │ ├─ contentRelations
│ │ │ │ ├─ useFetchContentRelations.js
│ │ │ │ ├─ useGetContentRelationsByUsername.js
│ │ │ │ └─ useToggleContentRelation.js
│ │ │ └─ lists
│ │ │ ├─ Modal
│ │ │ │ ├─ AddToListsModal.jsx
│ │ │ │ ├─ Context
│ │ │ │ │ ├─ ListsModalContext.js
│ │ │ │ │ └─ ListsModalProvider.jsx
│ │ │ │ └─ MiniCreateListModal.jsx
│ │ │ ├─ useAddItems.js
│ │ │ ├─ useCreateList.js
│ │ │ ├─ useDeleteList.js
│ │ │ ├─ useFetchListsItems.js
│ │ │ ├─ useGetList.js
│ │ │ ├─ useGetListsByIds.js
│ │ │ ├─ useRemoveItems.js
│ │ │ ├─ useToggleLikeList.js
│ │ │ └─ useUpdateList.js
│ │ ├─ App.jsx
│ │ ├─ assets
│ │ │ ├─ angle-down-svgrepo-com.svg
│ │ │ ├─ lightHouse.gif
│ │ │ ├─ star.svg
│ │ │ └─ tomato.svg
│ │ ├─ components
│ │ │ ├─ Footer
│ │ │ │ └─ Footer.jsx
│ │ │ ├─ Main
│ │ │ │ ├─ ContentDisplays
│ │ │ │ │ ├─ ContentDisplayBlock.jsx
│ │ │ │ │ ├─ ContentDisplayX.jsx
│ │ │ │ │ └─ MovieCard.jsx
│ │ │ │ ├─ HeroCarousel.jsx
│ │ │ │ ├─ hooks
│ │ │ │ │ └─ useFetchMainContent.js
│ │ │ │ ├─ Main.jsx
│ │ │ │ └─ Pagination
│ │ │ │ ├─ PaginationBar.jsx
│ │ │ │ └─ PaginationPanel.jsx
│ │ │ └─ Navigation
│ │ │ ├─ AuthModal
│ │ │ │ ├─ AuthModal.jsx
│ │ │ │ ├─ LoginForm.jsx
│ │ │ │ ├─ LogoutButton.jsx
│ │ │ │ ├─ NavProfileDropdown.jsx
│ │ │ │ └─ RegisterForm.jsx
│ │ │ ├─ FilterBox
│ │ │ │ ├─ Buttons
│ │ │ │ │ ├─ SelectCButton.jsx
│ │ │ │ │ ├─ SelectGButton.jsx
│ │ │ │ │ └─ SelectYButton.jsx
│ │ │ │ ├─ Displays
│ │ │ │ │ ├─ DisplaySelectedCountries.jsx
│ │ │ │ │ ├─ DisplaySelectedGenres.jsx
│ │ │ │ │ └─ DisplaySelectedYears.jsx
│ │ │ │ ├─ Filterbox.jsx
│ │ │ │ └─ MobileFilterbox.jsx
│ │ │ ├─ Logo.jsx
│ │ │ ├─ MobileMenu.jsx
│ │ │ ├─ Navbar.jsx
│ │ │ ├─ NavButton.jsx
│ │ │ └─ Search
│ │ │ ├─ hooks
│ │ │ │ └─ useFetchPreview.js
│ │ │ ├─ SearchButton.jsx
│ │ │ ├─ SearchInput.jsx
│ │ │ └─ SearchPreview.jsx
│ │ ├─ index.css
│ │ ├─ main.jsx
│ │ ├─ pages
│ │ │ ├─ About.jsx
│ │ │ ├─ Contact.jsx
│ │ │ ├─ DisplayByMedia
│ │ │ │ ├─ CustomHooks
│ │ │ │ │ ├─ useFetchContent.jsx
│ │ │ │ │ ├─ useFetchSearch.jsx
│ │ │ │ │ └─ useFetchSimilar.jsx
│ │ │ │ ├─ DeadEndFilters.jsx
│ │ │ │ └─ DisplayByMedia.jsx
│ │ │ ├─ Home.jsx
│ │ │ ├─ Privacy.jsx
│ │ │ ├─ Profile
│ │ │ │ ├─ Profile.jsx
│ │ │ │ ├─ ProfileBrowse
│ │ │ │ │ ├─ Activity
│ │ │ │ │ │ └─ ProfileActivity.jsx
│ │ │ │ │ ├─ ContentCard
│ │ │ │ │ │ ├─ ContentCard.jsx
│ │ │ │ │ │ ├─ ContentCardActions.jsx
│ │ │ │ │ │ ├─ ContentCardListView.jsx
│ │ │ │ │ │ ├─ ContentCardPoster.jsx
│ │ │ │ │ │ └─ ContentCardTooltip.jsx
│ │ │ │ │ ├─ Films
│ │ │ │ │ │ └─ ProfileFilms.jsx
│ │ │ │ │ ├─ Likes
│ │ │ │ │ │ ├─ ProfileLikes.jsx
│ │ │ │ │ │ ├─ ProfileLikesFilms.jsx
│ │ │ │ │ │ └─ ProfileLikesLists.jsx
│ │ │ │ │ ├─ Lists
│ │ │ │ │ │ ├─ List
│ │ │ │ │ │ │ ├─ EditList
│ │ │ │ │ │ │ │ ├─ EditList.jsx
│ │ │ │ │ │ │ │ ├─ EditListActions.jsx
│ │ │ │ │ │ │ │ ├─ EditListActionsDropdown.jsx
│ │ │ │ │ │ │ │ ├─ EditListHeader.jsx
│ │ │ │ │ │ │ │ ├─ EditListItems.jsx
│ │ │ │ │ │ │ │ ├─ handlers
│ │ │ │ │ │ │ │ │ └─ useListHandlers.js
│ │ │ │ │ │ │ │ └─ hooks
│ │ │ │ │ │ │ ├─ List.jsx
│ │ │ │ │ │ │ ├─ ListActions.jsx
│ │ │ │ │ │ │ ├─ ListHeader.jsx
│ │ │ │ │ │ │ ├─ ListItemsDisplay.jsx
│ │ │ │ │ │ │ └─ WatchedPercentage.jsx
│ │ │ │ │ │ ├─ ListCard.jsx
│ │ │ │ │ │ ├─ ListCardPosters.jsx
│ │ │ │ │ │ └─ ProfileLists.jsx
│ │ │ │ │ ├─ ProfileBrowse.jsx
│ │ │ │ │ └─ Watchlist
│ │ │ │ │ └─ ProfileWatchlist.jsx
│ │ │ │ ├─ ProfileCard.jsx
│ │ │ │ ├─ ProfileContentSection.jsx
│ │ │ │ ├─ ProfileMain.jsx
│ │ │ │ ├─ ProfileNavBar.jsx
│ │ │ │ └─ RatingRateDisplay.jsx
│ │ │ └─ Watch
│ │ │ ├─ Comments.jsx
│ │ │ ├─ CustomHooks
│ │ │ │ ├─ useFetchContent.jsx
│ │ │ │ ├─ useFetchEpisode.jsx
│ │ │ │ └─ useFetchSimilar.jsx
│ │ │ ├─ Description.jsx
│ │ │ ├─ EpisodeDisplay.jsx
│ │ │ ├─ MiniMovieCard.jsx
│ │ │ ├─ SeasonDropDown.jsx
│ │ │ ├─ SimContent.jsx
│ │ │ ├─ Trailer.jsx
│ │ │ ├─ TvContentDisplay.jsx
│ │ │ └─ Watch.jsx
│ │ └─ utils
│ │ ├─ CountriesMap.js
│ │ ├─ GenreMap.js
│ │ ├─ Keys.js
│ │ ├─ ScollToTop.jsx
│ │ └─ timeAgo.js
│ ├─ tailwind.config.js
│ └─ vite.config.js
├─ README.md
├─ requirements.txt
└─ scripts
├─ backend.ps1
└─ frontend.ps1

```

```
