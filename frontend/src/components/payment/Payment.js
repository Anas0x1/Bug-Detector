import React from 'react'

export default function Payment() {
  return (
  
    <>
    
    
    
    <div className="container d-flex justify-content-center mt-5 mb-5">

            

            <div className="row g-3">

              <div className="col-md-6">  
                
                <span>Payment Method</span>
                <div className="card" style={{width:"500px"}}>

                  <div className="accordion" id="accordionExample">
                    
        

                    <div className="card">
                      <div className="card-header p-0">
                        <h2 className="mb-0">
                          <button className="btn btn-light btn-block text-left p-3 rounded-0" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <div className="d-flex align-items-center justify-content-between">

                              <span>Credit card</span>
                              <div className="icons">
                                <img src="https://i.imgur.com/2ISgYja.png" alt='/' width="30"/>
                                <img src="https://i.imgur.com/W1vtnOV.png" alt='/' width="30"/>
                                <img src="https://i.imgur.com/35tC99g.png"  alt='/' width="30"/>
                                <img src="https://i.imgur.com/2ISgYja.png" alt='/' width="30"/>
                              </div>
                              
                            </div>
                          </button>
                        </h2>
                      </div>

                      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                        <div className="card-body payment-card-body">
                          
                          <span className="font-weight-normal card-text">Card Number</span>
                          <div className="input">

                            <i className="fa fa-credit-card"></i>
                            <input type="text" className="form-control" placeholder="0000 0000 0000 0000"/>
                            
                          </div> 

                          <div className="row mt-3 mb-3">

                            <div className="col-md-6">

                              <span className="font-weight-normal card-text">Expiry Date</span>
                              <div className="input">

                                <i className="fa fa-calendar"></i>
                                <input type="text" className="form-control" placeholder="MM/YY"/>
                                
                              </div> 
                              
                            </div>


                            <div className="col-md-6">

                              <span className="font-weight-normal card-text">CVC/CVV</span>
                              <div className="input">

                                <i className="fa fa-lock"></i>
                                <input type="text" className="form-control" placeholder="000"/>
                                
                              </div> 
                              
                            </div>
                            

                          </div>

                          <span className="text-muted certificate-text"><i className="fa fa-lock"></i> Your transaction is secured with ssl certificate</span>
                         
                        </div>
                      </div>
                      <div className="container" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                      <button className='btn btn-success' style={{width:"300px",marginBottom:"10px"}}>Checkout</button>
                      </div>
                    </div>
                    
                  </div>
                  
                </div>

              </div>

           
            </div>
            
         
    </div>
    </>
  )
}
