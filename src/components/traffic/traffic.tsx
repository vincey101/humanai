import {Box, Grid} from "@mui/material";

export default function Traffic() {
    return (

        <div className="page-content" style={{padding: '20px'}}>
            <div className="container-fluid">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={1} md={1} lg={1} className={'w3-hide-small'}></Grid>
                    <Grid item xs={12} sm={10} md={10} lg={10} className={''}>
                        <div className="row">
                            <div className="col-12">
                                <div
                                    className="page-title-box d-sm-flex align-items-center justify-content-between">
                                    <h4 className="mb-sm-0 font-size-18 page-header">Traffic Booster</h4>

                                </div>
                            </div>
                        </div>
                        <Box className="content mt-3" sx={{mt: 3}}>
                            <div className="animated fadeIn">
                                <div className="row hot_products">
                                    <div className="col-lg-12 product_entry">
                                        <div className="col-lg-6">
                                            <section className="card">
                                                <h3 style={{fontSize: 17, fontWeight: '700'}}>Traffic Booster Method
                                                    #1</h3>
                                                <p>
                                                    <span style={{color: "black", fontWeight: 600}}>
                                                      Step 1 -
                                                    </span>{" "}
                                                    <a
                                                        href="https://www.addtoany.com/share"
                                                        target="_blank"
                                                        style={{color: "blue"}}
                                                    >
                                                        <b> Click Here To Start Driving Traffic </b>
                                                    </a>{" "}
                                                </p>
                                                <p style={{color: "black"}}>
                                                    <span style={{fontWeight: 600}}>Step 2 -</span>{" "}
                                                    <b>
                                                        Paste your Sales Engine URL &amp; Share on Multiple
                                                        Platforms
                                                    </b>
                                                </p>
                                                <img
                                                    className="align-content"
                                                    src="https://mybrainboxapp.com/images/login2.jpeg"
                                                    alt="logo"
                                                />
                                            </section>
                                        </div>
                                        <br/>
                                        <div className="col-lg-6">
                                            <section className="card">
                                                <h3 style={{fontSize: 17, fontWeight: '700'}}>Traffic Booster Method
                                                    #2</h3>
                                                <p style={{color: "black"}}>
                                                <span style={{color: "black", fontWeight: 600}}>
                                                  Step 1 -
                                                </span>{" "}
                                                    <b>Grab Your Facebook &amp; Google Pixel</b>
                                                </p>
                                                <p style={{color: "black"}}>
                                                <span style={{color: "black", fontWeight: 600}}>
                                                  Step 2 -
                                                </span>{" "}
                                                    <b>Send The Pixel Code To Our Support Desk</b>{" "}
                                                    <a
                                                        href="http://appclicksupportdesk.com/"
                                                        target="_blank"
                                                        style={{color: "blue"}}
                                                    >
                                                        {" "}
                                                        <b>(Click Here To Contact Support Desk.)</b>
                                                    </a>{" "}
                                                </p>
                                                <p style={{color: "red", fontWeight: 700}}>
                                                    <i>
                                                        (Note - Include your traffic booster purchase receipt in the
                                                        ticket).
                                                    </i>
                                                </p>
                                                <p style={{color: "black"}}>
                                                <span style={{color: "black", fontWeight: 600}}>
                                                  Step 3 -
                                                </span>{" "}
                                                    <b>
                                                        We Will Implement Within 48 Hours &amp; You Should See Your
                                                        Pixels Fired Up With Activity.
                                                    </b>
                                                </p>
                                                <div>&nbsp;</div>
                                            </section>
                                        </div>
                                        <br/>
                                        <div className="col-lg-6">
                                            <section className="card">
                                                <h3 style={{fontSize: 17, fontWeight: '700'}}>Traffic Booster Method
                                                    #3</h3>

                                                <p style={{color: "black"}}>
                                                <span style={{color: "black", fontWeight: 600}}>
                                                     Step -
                                                </span>{" "}

                                                    <a
                                                        href="http://www.usnetads.com/post/post-free-ads.php"
                                                        target="_blank"
                                                        style={{color: "blue"}}
                                                    >
                                                        {" "}
                                                        <b>Click here to Post Free Targeted Ads & Generate Traffic</b>
                                                    </a>{" "}
                                                </p>

                                                <div>&nbsp;</div>
                                            </section>
                                        </div>
                                        <div className="col-lg-12">&nbsp;</div>
                                        <div>&nbsp;</div>
                                    </div>
                                </div>
                                {/* .animated */}
                            </div>
                            {/* table end */}
                        </Box>
                    </Grid>

                </Grid>
            </div>
        </div>


    )
}