import React, { useState } from 'react';
import { Alert } from '../types';
import { X, Download, Target, Lightbulb, Zap, Shield, TreePine, Car, Bus, Star } from 'lucide-react';
import jsPDF from 'jspdf';

interface InterventionCardProps {
  title: string;
  description: string;
  impact: string;
  icon: React.ComponentType<any>;
  selected: boolean;
  onClick: () => void;
  aqiReduction: number;
}

const InterventionCard: React.FC<InterventionCardProps> = ({
  title,
  description,
  impact,
  icon: Icon,
  selected,
  onClick,
  aqiReduction
}) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        selected
          ? 'border-green-500 bg-green-50 shadow-lg transform scale-105'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
    >
      <div className="flex items-center space-x-3 mb-2">
        <Icon className={`h-5 w-5 ${selected ? 'text-green-600' : 'text-gray-600'}`} />
        <h4 className="font-semibold text-gray-900">{title}</h4>
        {selected && (
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
            -{aqiReduction} AQI
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 mb-2">{description}</p>
      <div className="text-xs text-green-600 font-medium">{impact}</div>
    </div>
  );
};

interface SimulatorProps {
  alert: Alert;
  onClose: () => void;
}

const Simulator: React.FC<SimulatorProps> = ({ alert: alertData, onClose }) => {
  const [interventions, setInterventions] = useState({
    // Traffic & Transport
    dedicatedBusLanes: false,
    bikeWalkingInfrastructure: false,
    smartTrafficSignals: false,
    vehicleRestrictions: false,
    publicTransportBoost: false,
    evChargingIncentives: false,
    
    // Urban Design & Environment
    treeCanopyGreenBuffers: false,
    lowEmissionZone: false,
    dustControlMeasures: false,
    streetTrees: false,
    greenWalls: false,
    permeablePavement: false,
    
    // Policy & Quick Fixes
    banOpenBurning: false,
    constructionDustControl: false,
    wasteManagement: false,
    industrialEmissionControls: false,
    vehicleEmissionTesting: false,
    publicAwareness: false
  });

  const [simulationResult, setSimulationResult] = useState<any>(null);

  const handleInterventionChange = (key: string, value: boolean) => {
    const newInterventions = { ...interventions, [key]: value };
    setInterventions(newInterventions);
    runSimulationWithInterventions(newInterventions);
  };

  const runSimulationWithInterventions = (interventionsToUse: any) => {
    try {
      console.log('Running simulation with interventions:', interventionsToUse);
      
      // Calculate new AQI based on selected interventions
      let newAQI = alertData.aqi;
      let aqiReduction = 0;
      
      // Apply realistic urban intervention effects
      
      // Traffic & Transport (5-20% AQI reduction)
      if (interventionsToUse.dedicatedBusLanes) { newAQI -= alertData.aqi * 0.12; aqiReduction += alertData.aqi * 0.12; }
      if (interventionsToUse.bikeWalkingInfrastructure) { newAQI -= alertData.aqi * 0.08; aqiReduction += alertData.aqi * 0.08; }
      if (interventionsToUse.smartTrafficSignals) { newAQI -= alertData.aqi * 0.10; aqiReduction += alertData.aqi * 0.10; }
      if (interventionsToUse.vehicleRestrictions) { newAQI -= alertData.aqi * 0.15; aqiReduction += alertData.aqi * 0.15; }
      if (interventionsToUse.publicTransportBoost) { newAQI -= alertData.aqi * 0.12; aqiReduction += alertData.aqi * 0.12; }
      if (interventionsToUse.evChargingIncentives) { newAQI -= alertData.aqi * 0.15; aqiReduction += alertData.aqi * 0.15; }
      
      // Urban Design & Environment (5-20% AQI reduction)
      if (interventionsToUse.treeCanopyGreenBuffers) { newAQI -= alertData.aqi * 0.08; aqiReduction += alertData.aqi * 0.08; }
      if (interventionsToUse.lowEmissionZone) { newAQI -= alertData.aqi * 0.18; aqiReduction += alertData.aqi * 0.18; }
      if (interventionsToUse.dustControlMeasures) { newAQI -= alertData.aqi * 0.10; aqiReduction += alertData.aqi * 0.10; }
      if (interventionsToUse.streetTrees) { newAQI -= alertData.aqi * 0.06; aqiReduction += alertData.aqi * 0.06; }
      if (interventionsToUse.greenWalls) { newAQI -= alertData.aqi * 0.05; aqiReduction += alertData.aqi * 0.05; }
      if (interventionsToUse.permeablePavement) { newAQI -= alertData.aqi * 0.04; aqiReduction += alertData.aqi * 0.04; }
      
      // Policy & Quick Fixes (10-25% AQI reduction)
      if (interventionsToUse.banOpenBurning) { newAQI -= alertData.aqi * 0.20; aqiReduction += alertData.aqi * 0.20; }
      if (interventionsToUse.constructionDustControl) { newAQI -= alertData.aqi * 0.12; aqiReduction += alertData.aqi * 0.12; }
      if (interventionsToUse.wasteManagement) { newAQI -= alertData.aqi * 0.08; aqiReduction += alertData.aqi * 0.08; }
      if (interventionsToUse.industrialEmissionControls) { newAQI -= alertData.aqi * 0.22; aqiReduction += alertData.aqi * 0.22; }
      if (interventionsToUse.vehicleEmissionTesting) { newAQI -= alertData.aqi * 0.10; aqiReduction += alertData.aqi * 0.10; }
      if (interventionsToUse.publicAwareness) { newAQI -= alertData.aqi * 0.05; aqiReduction += alertData.aqi * 0.05; }
      
      // Prevent negative AQI
      newAQI = Math.max(newAQI, 0);
      
      // Calculate improvement percentage
      const improvementPercent = ((alertData.aqi - newAQI) / alertData.aqi) * 100;
      
      // Calculate population benefited
      const populationBenefited = Math.round((alertData.populationExposed || 0) * (improvementPercent / 100));
      
      // Create simulation result
      const result = {
        zoneId: alertData.zoneId,
        baseline: {
          currentAqi: alertData.aqi,
          newAqi: Math.round(newAQI),
          currentPm25: Math.round(alertData.aqi * 0.4),
          currentPm10: Math.round(alertData.aqi * 0.6),
          currentNo2: Math.round(alertData.aqi * 0.2),
          populationExposed: alertData.populationExposed
        },
        interventions: interventionsToUse,
        simulationResults: {
          aqiReduction: improvementPercent,
          pm25Reduction: improvementPercent * 0.8,
          pm10Reduction: improvementPercent * 0.6,
          no2Reduction: improvementPercent * 0.4,
          populationBenefited: populationBenefited,
          costBenefitRatio: 2.5 + (improvementPercent / 20),
          implementationTimeline: 6 + (improvementPercent / 10),
          nasaConfidence: 0.85 + (improvementPercent / 400)
        },
        detailedImpacts: [],
        recommendations: [],
        nasaInsights: {},
        dataSource: 'Urban Planning Simulation',
        timestamp: new Date().toISOString()
      };
      
      console.log('Setting simulation result:', result);
      setSimulationResult(result);
    } catch (error) {
      console.error('Error in simulation:', error);
    }
  };

  const generatePDFReport = () => {
    try {
      console.log('PDF Generation started...');
      
      if (!simulationResult) {
        console.error('No simulation result available');
        alert('Please run a simulation first by selecting interventions');
        return;
      }
      
      console.log('Creating PDF document...');
      const doc = new jsPDF();
      
      // Add content
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('Urban Air Quality Report', 20, 30);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Zone: ${alertData.zoneId}`, 20, 50);
      doc.text(`Current AQI: ${alertData.aqi}`, 20, 70);
      doc.text(`Improved AQI: ${simulationResult.baseline.newAqi || Math.round(alertData.aqi * (1 - simulationResult.simulationResults.aqiReduction / 100))}`, 20, 90);
      doc.text(`Improvement: ${simulationResult.simulationResults.aqiReduction.toFixed(0)}%`, 20, 110);
      doc.text(`People Benefited: ${simulationResult.simulationResults.populationBenefited.toLocaleString()}`, 20, 130);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 150);
      
      // Save the PDF
      const fileName = `Air_Quality_Report_${alertData.zoneId}_${new Date().toISOString().split('T')[0]}.pdf`;
      console.log('Saving PDF as:', fileName);
      doc.save(fileName);
      
      console.log('PDF generated successfully!');
      alert('PDF report downloaded successfully!');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again.');
    }
  };

  const getInterventionImpact = (key: string): number => {
    const impactMap: { [key: string]: number } = {
      // Traffic & Transport
      dedicatedBusLanes: 12, bikeWalkingInfrastructure: 8, smartTrafficSignals: 10,
      vehicleRestrictions: 15, publicTransportBoost: 12, evChargingIncentives: 15,
      
      // Urban Design & Environment
      treeCanopyGreenBuffers: 8, lowEmissionZone: 18, dustControlMeasures: 10,
      streetTrees: 6, greenWalls: 5, permeablePavement: 4,
      
      // Policy & Quick Fixes
      banOpenBurning: 20, constructionDustControl: 12, wasteManagement: 8,
      industrialEmissionControls: 22, vehicleEmissionTesting: 10, publicAwareness: 5
    };
    
    return impactMap[key] || 0;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Solution Simulator</h2>
            <p className="text-gray-600 mt-1">Test interventions for {alertData.zoneName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-8 flex-1 overflow-y-auto">
          {/* Current Conditions */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Current Conditions</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-red-600">{alertData.aqi}</div>
                <div className="text-sm text-gray-600">AQI</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-3xl font-bold text-orange-600">{alertData.aqi > 200 ? '92' : '75'}</div>
                <div className="text-sm text-gray-600">PM2.5 µg/m³</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-lg font-bold text-gray-900">VERY UNHEALTHY</div>
                <div className="text-sm text-gray-600">Status</div>
              </div>
            </div>
          </div>

          {/* Simulation Results - Always Visible */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900">Simulation Results</h3>
              <p className="text-sm text-gray-600 mt-1">Select interventions below to see impact</p>
            </div>
            
            {simulationResult ? (
              <>
                {/* Before AQI → After AQI */}
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-gray-900">
                    {alertData.aqi} → {simulationResult.baseline.newAqi || Math.round(alertData.aqi * (1 - simulationResult.simulationResults.aqiReduction / 100))}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">Before AQI → After AQI</div>
                </div>

                {/* % Improvement */}
                <div className="text-center mb-4">
                  <div className="text-2xl font-bold text-green-600">
                    {simulationResult.simulationResults.aqiReduction.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Improvement</div>
                </div>

                {/* Additional Impact Details */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {simulationResult.simulationResults.populationBenefited.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-600">People Benefited</div>
                  </div>
                </div>

                {/* Large Download PDF Button */}
                <div className="mt-6 text-center">
                  <button
                    onClick={generatePDFReport}
                    className="flex items-center justify-center space-x-3 mx-auto px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    <Download className="h-6 w-6" />
                    <span className="text-lg font-bold">Download Complete Report (PDF)</span>
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Generate comprehensive urban planning report with all data</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-400 text-lg mb-2">📊</div>
                <p className="text-gray-500">Select interventions below to see simulation results</p>
              </div>
            )}
          </div>

          {/* Realistic Urban Planning Solutions */}
          <div className="h-full flex flex-col">
            <div className="flex items-center space-x-2 mb-6">
              <Star className="h-5 w-5 text-green-600" />
              <h3 className="text-lg font-bold text-gray-900">Urban Planning Solutions</h3>
            </div>
            
            {/* Scrollable Solutions Container */}
            <div className="relative">
              <div 
                className="overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400" 
                style={{ 
                  maxHeight: '300px',
                  minHeight: '200px',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f3f4f6'
                }}
              >
                {/* Traffic & Transport */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Car className="h-4 w-4 text-blue-600" />
                    <span>🚦 Traffic & Transport</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InterventionCard
                      title="Dedicated Bus Lanes"
                      description="Priority lanes for buses reduce congestion + emissions"
                      impact="10-15% AQI reduction"
                      icon={Bus}
                      selected={interventions.dedicatedBusLanes}
                      onClick={() => handleInterventionChange('dedicatedBusLanes', !interventions.dedicatedBusLanes)}
                      aqiReduction={Math.round(alertData.aqi * 0.12)}
                    />
                    <InterventionCard
                      title="Bike & Walking Infrastructure"
                      description="Protected bike lanes, wider footpaths"
                      impact="5-10% AQI reduction"
                      icon={Car}
                      selected={interventions.bikeWalkingInfrastructure}
                      onClick={() => handleInterventionChange('bikeWalkingInfrastructure', !interventions.bikeWalkingInfrastructure)}
                      aqiReduction={Math.round(alertData.aqi * 0.08)}
                    />
                    <InterventionCard
                      title="Smart Traffic Signals"
                      description="AI-based adaptive signal timing"
                      impact="7-12% AQI reduction"
                      icon={Zap}
                      selected={interventions.smartTrafficSignals}
                      onClick={() => handleInterventionChange('smartTrafficSignals', !interventions.smartTrafficSignals)}
                      aqiReduction={Math.round(alertData.aqi * 0.10)}
                    />
                    <InterventionCard
                      title="Vehicle Restrictions"
                      description="Odd-even license plate days or no-entry zones"
                      impact="10-20% AQI reduction"
                      icon={Target}
                      selected={interventions.vehicleRestrictions}
                      onClick={() => handleInterventionChange('vehicleRestrictions', !interventions.vehicleRestrictions)}
                      aqiReduction={Math.round(alertData.aqi * 0.15)}
                    />
                    <InterventionCard
                      title="Public Transport Boost"
                      description="More buses/metro frequency, lower fares"
                      impact="10-15% AQI reduction"
                      icon={Bus}
                      selected={interventions.publicTransportBoost}
                      onClick={() => handleInterventionChange('publicTransportBoost', !interventions.publicTransportBoost)}
                      aqiReduction={Math.round(alertData.aqi * 0.12)}
                    />
                    <InterventionCard
                      title="EV Charging & Incentives"
                      description="Support shift from petrol/diesel to EVs"
                      impact="10-20% AQI reduction"
                      icon={Zap}
                      selected={interventions.evChargingIncentives}
                      onClick={() => handleInterventionChange('evChargingIncentives', !interventions.evChargingIncentives)}
                      aqiReduction={Math.round(alertData.aqi * 0.15)}
                    />
                  </div>
                </div>

                {/* Urban Design & Environment */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <TreePine className="h-4 w-4 text-green-600" />
                    <span>🌳 Urban Design & Environment</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InterventionCard
                      title="Tree Canopy & Green Buffers"
                      description="Street trees, mini forests, green walls"
                      impact="5-8% AQI reduction"
                      icon={TreePine}
                      selected={interventions.treeCanopyGreenBuffers}
                      onClick={() => handleInterventionChange('treeCanopyGreenBuffers', !interventions.treeCanopyGreenBuffers)}
                      aqiReduction={Math.round(alertData.aqi * 0.08)}
                    />
                    <InterventionCard
                      title="Low-Emission Zone (LEZ)"
                      description="Only EVs, CNG buses, low-emission cars allowed"
                      impact="15-20% AQI reduction"
                      icon={Target}
                      selected={interventions.lowEmissionZone}
                      onClick={() => handleInterventionChange('lowEmissionZone', !interventions.lowEmissionZone)}
                      aqiReduction={Math.round(alert.aqi * 0.18)}
                    />
                    <InterventionCard
                      title="Dust Control Measures"
                      description="Spraying roads, covering construction sites"
                      impact="10% AQI reduction"
                      icon={Shield}
                      selected={interventions.dustControlMeasures}
                      onClick={() => handleInterventionChange('dustControlMeasures', !interventions.dustControlMeasures)}
                      aqiReduction={Math.round(alertData.aqi * 0.10)}
                    />
                    <InterventionCard
                      title="Street Trees"
                      description="Strategic tree planting along roads"
                      impact="5-6% AQI reduction"
                      icon={TreePine}
                      selected={interventions.streetTrees}
                      onClick={() => handleInterventionChange('streetTrees', !interventions.streetTrees)}
                      aqiReduction={Math.round(alertData.aqi * 0.06)}
                    />
                    <InterventionCard
                      title="Green Walls"
                      description="Vertical vegetation systems on buildings"
                      impact="4-5% AQI reduction"
                      icon={TreePine}
                      selected={interventions.greenWalls}
                      onClick={() => handleInterventionChange('greenWalls', !interventions.greenWalls)}
                      aqiReduction={Math.round(alertData.aqi * 0.05)}
                    />
                    <InterventionCard
                      title="Permeable Pavement"
                      description="Water-absorbing surfaces reduce dust"
                      impact="3-4% AQI reduction"
                      icon={TreePine}
                      selected={interventions.permeablePavement}
                      onClick={() => handleInterventionChange('permeablePavement', !interventions.permeablePavement)}
                      aqiReduction={Math.round(alertData.aqi * 0.04)}
                    />
                  </div>
                </div>

                {/* Policy & Quick Fixes */}
                <div className="mb-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-red-600" />
                    <span>⚙️ Policy & Quick Fixes</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <InterventionCard
                      title="Ban Open Burning"
                      description="Prevent trash/leaf burning - huge PM2.5 impact"
                      impact="15-25% AQI reduction"
                      icon={Shield}
                      selected={interventions.banOpenBurning}
                      onClick={() => handleInterventionChange('banOpenBurning', !interventions.banOpenBurning)}
                      aqiReduction={Math.round(alertData.aqi * 0.20)}
                    />
                    <InterventionCard
                      title="Construction Dust Control"
                      description="Mandatory dust suppression at construction sites"
                      impact="10-12% AQI reduction"
                      icon={Shield}
                      selected={interventions.constructionDustControl}
                      onClick={() => handleInterventionChange('constructionDustControl', !interventions.constructionDustControl)}
                      aqiReduction={Math.round(alertData.aqi * 0.12)}
                    />
                    <InterventionCard
                      title="Waste Management"
                      description="Proper waste collection and disposal systems"
                      impact="6-8% AQI reduction"
                      icon={Shield}
                      selected={interventions.wasteManagement}
                      onClick={() => handleInterventionChange('wasteManagement', !interventions.wasteManagement)}
                      aqiReduction={Math.round(alertData.aqi * 0.08)}
                    />
                    <InterventionCard
                      title="Industrial Emission Controls"
                      description="Strict emission standards for factories"
                      impact="18-22% AQI reduction"
                      icon={Shield}
                      selected={interventions.industrialEmissionControls}
                      onClick={() => handleInterventionChange('industrialEmissionControls', !interventions.industrialEmissionControls)}
                      aqiReduction={Math.round(alertData.aqi * 0.22)}
                    />
                    <InterventionCard
                      title="Vehicle Emission Testing"
                      description="Regular testing and maintenance requirements"
                      impact="8-10% AQI reduction"
                      icon={Shield}
                      selected={interventions.vehicleEmissionTesting}
                      onClick={() => handleInterventionChange('vehicleEmissionTesting', !interventions.vehicleEmissionTesting)}
                      aqiReduction={Math.round(alertData.aqi * 0.10)}
                    />
                    <InterventionCard
                      title="Public Awareness"
                      description="Education campaigns on air quality"
                      impact="3-5% AQI reduction"
                      icon={Lightbulb}
                      selected={interventions.publicAwareness}
                      onClick={() => handleInterventionChange('publicAwareness', !interventions.publicAwareness)}
                      aqiReduction={Math.round(alertData.aqi * 0.05)}
                    />
                  </div>
                </div>
              </div>
              {/* Scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
              <div className="text-center text-xs text-gray-500 mt-2">
                <span className="inline-flex items-center space-x-1">
                  <span>📜</span>
                  <span>Scroll to see all 18 solutions</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Simulator;image.png