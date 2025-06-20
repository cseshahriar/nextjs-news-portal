import React from 'react'

const AppNavBar = () => {
  return (
    <div>
        <div class="py-2 bg-dark text-white container-fluid">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-md-4">
                        <h6><i class="bi bi-calendar2-check"></i> Today:<span id="newDate"></span>
                            <script>
                                (function() {
                                    const today = new Date();
                                    const options = {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    };
                                    document.getElementById('newDate').textContent = today.toLocaleDateString(undefined, options);
                                })();
                            </script>
                        </h6>
                    </div>
                    <div class="col-md-4">
                        <span class="float-end">
                            <a target="_blank" class="text-white" href="#"><i class="mx-2 bi bi-facebook"></i></a>
                            <a target="_blank" class="text-white" href="#"><i class="mx-2 bi bi-youtube"></i></a>
                            <a target="_blank" class="text-white" href="#"><i class="mx-2 bi bi-twitter"></i></a>
                            <a target="_blank" class="text-white" href="#"><i class="mx-2 bi bi-linkedin"></i></a>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <nav class="navbar expand-lg bg-white sticky-top shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img class="navbar-logo" src="/images/logo.svg" alt="img">
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavScroll" aria-controls="navbarNavScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavScroll">
                    <ul class="navbar-nav me-auto my-3 my-lg-0" style="max-height: 100px" id="navbarScroll">
                        <li class="nav-item">
                            <a class="nav-link nav-link f-13" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link f-13" href="/category?id=">Link</a>
                        </li>
                    </ul>
                    <div class="d-flex ms-3">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Search..." aria-label="Search">
                            <a href="/search?keyword=" class="btn btn-danger" type="button"><i class="bi bi-search"></i></a>
                        </div>
                    </div>
                    <a href="/user/login" class="btn ms-3 btn-outline-danger">Login</a>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default AppNavBar