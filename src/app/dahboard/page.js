"use client"
import  { useState } from 'react';
import './BusinessPlansDashboard.scss';

export default function BusinessPlansDashboard()  {
  const [activePlan, setActivePlan] = useState(null);
  
  const userData = {
    name: "Yuvraj Singh Thapa",
    email: "yuvrajsinghthapa609@gmail.com",
    dailyPlans: 3,
    remainingToday: 0
  };

  const businessPlans = [
    {
      id: 1,
      name: "sadsad",
      created: "Jun 2, 2025, 02:26 PM",
      pricingTiers: 3,
      startingPrice: "₹14000"
    },
    {
      id: 2,
      name: "Evolkun",
      created: "Jun 2, 2025, 04:16 PM",
      pricingTiers: 3,
      startingPrice: "₹14000"
    },
    {
      id: 3,
      name: "Shubham",
      created: "Jun 2, 2025, 06:07 PM",
      pricingTiers: 3,
      startingPrice: "₹14000"
    }
    ,
    {
      id: 4,
      name: "Shubham",
      created: "Jun 2, 2025, 06:07 PM",
      pricingTiers: 3,
      startingPrice: "₹14000"
    }
  ];

  const handlePlanClick = (id) => {
    setActivePlan(activePlan === id ? null : id);
  };

  return (
    <div className="business-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="user-info">
          <h1 className="user-name">{userData.name}</h1>
          <p className="user-email">{userData.email}</p>
        </div>
        
        <div className="daily-stats">
          <div className="stat-card">
            <span>Daily Plans</span>
            <div className="stat-value">{userData.dailyPlans}</div>
          </div>
          <div className="stat-card">
            <span>Remaining Today</span>
            <div className="stat-value highlight">{userData.remainingToday}</div>
          </div>
        </div>
      </header>

      <div className="divider"></div>

      {/* Business Plans Section */}
      <section className="plans-section">
        <h2 className="section-title">Your Business Plans</h2>
        
        <div className="plans-grid">
          {businessPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`plan-card ${activePlan === plan.id ? 'active' : ''}`}
              onClick={() => handlePlanClick(plan.id)}
            >
              <div className="card-header">
                <h3 className="plan-name">{plan.name}</h3>
                <div className="pricing-badge">From {plan.startingPrice}</div>
              </div>
              
              <div className="card-body">
                <div className="plan-meta">
                  <span className="meta-label">Created</span>
                  <span>{plan.created}</span>
                </div>
                
                <div className="tiers-indicator">
                  <div className="tiers-label">{plan.pricingTiers} pricing tiers</div>
                  <div className="tiers-visual">
                    {[...Array(plan.pricingTiers)].map((_, i) => (
                      <div 
                        key={i} 
                        className="tier-dot"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card-actions">
                <button className="action-btn">View Details</button>
                {/* <button className="action-btn primary">Edit Plan</button> */}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
