<template>
    <div class="row">
        <div class="col-sm-8 offset-sm-2">
            <h1 class="text-center title">Welcome to <span class="bold">Socratik</span></h1>
        </div>
    </div>
    <div class="row">
        <br>
        <div class="col-sm-4 offset-sm-4">
            <br>
            <div class="row card">
                <div class="col-sm-10 offset-sm-1">
                    <div class="row">
                        <div class="col-sm-12">
                            <br>
                            <h2 class="text-center">Log In</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <form id="login">
                                <div class="form-group">
                                    <label for="loginemail">Email Address:&nbsp;&nbsp;</label>
                                    <input type="email" class="form-control" id="loginemail" />
                                </div>
                                <div class="form-group">
                                    <label for="loginpassword">Password:&nbsp;&nbsp;</label>
                                    <input type="password" class="form-control" id="loginpassword" />
                                </div>
                                <div class="form-group text-center">
                                    <button id="loginbutton" type="submit" class="btn btn-primary">Log In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <!-- OR -->
            <br>
            <div class="row card">
                <div class="col-sm-10 offset-sm-1">
                    <div class="row">
                        <div class="col-sm-12">
                            <br>
                            <h2 class="text-center">Register</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <form id="register">
                                <div class="form-group">
                                    <label for="registeremail">Email Address:&nbsp;&nbsp;</label>
                                    <input type="email" class="form-control" id="registeremail" />
                                </div>
                                <div class="form-group">
                                    <label for="registerpassword">Password:&nbsp;&nbsp;</label>
                                    <input type="password" class="form-control" id="registerpassword" />
                                </div>
                                <div class="form-group">
                                    <label for="registerfirstname">First Name:&nbsp;&nbsp;</label>
                                    <input type="text" class="form-control" id="registerfirstname" />
                                </div>
                                <div class="form-group">
                                    <label for="registerlastname">Last Name:&nbsp;&nbsp;</label>
                                    <input type="text" class="form-control" id="registerlastname" />
                                </div>
                                <div class="form-group text-center">
                                    <button id="registerbutton" type="submit" class="btn btn-primary">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>