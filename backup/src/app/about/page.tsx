import React from 'react';
import Section from '@/components/ui/Section';
import SectionHeading from '@/components/ui/SectionHeading';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Informatik-AI',
  description: 'Learn about Informatik-AI, our mission, vision, and the team behind our innovative AI solutions for businesses.',
};

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <Section background="dark" className="py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Informatik-AI</h1>
          <p className="text-xl text-gray-300">
            We're on a mission to transform businesses through the power of artificial intelligence.
          </p>
        </div>
      </Section>

      {/* Our Story Section */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="Our Story"
              subtitle="How Informatik-AI began and where we're headed"
            />
            <p className="text-gray-600 mb-4">
              Founded in 2020, Informatik-AI was born from a vision to make advanced AI technologies accessible to businesses of all sizes. Our founders, a team of AI researchers and industry veterans, recognized that while artificial intelligence was revolutionizing many sectors, many companies lacked the expertise to implement these solutions effectively.
            </p>
            <p className="text-gray-600 mb-4">
              We started with a small team dedicated to developing custom AI solutions for a handful of clients. As our reputation for delivering impactful results grew, so did our company. Today, Informatik-AI is a leading provider of AI solutions, serving clients across various industries worldwide.
            </p>
            <p className="text-gray-600">
              Our journey is driven by continuous innovation and a commitment to helping businesses leverage the transformative power of AI to achieve their goals.
            </p>
          </div>
          <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
            {/* Placeholder for an image */}
            <p className="text-gray-500 text-center p-4">
              [Company history image will be placed here]
            </p>
          </div>
        </div>
      </Section>

      {/* Mission & Vision Section */}
      <Section background="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h3>
            <p className="text-gray-600">
              To empower businesses with intelligent AI solutions that drive innovation, efficiency, and growth. We strive to make advanced AI technologies accessible and practical for organizations of all sizes.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-blue-600">Our Vision</h3>
            <p className="text-gray-600">
              To be the global leader in business-focused AI solutions, recognized for our innovation, expertise, and the measurable value we create for our clients. We envision a future where AI enhances human capabilities across all industries.
            </p>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      <Section>
        <SectionHeading
          title="Our Team"
          subtitle="Meet the experts behind Informatik-AI"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              {/* Placeholder for team member photo */}
              <p className="text-gray-500 text-center p-4">
                [Team member photo]
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Especialista. Camila Bañares</h3>
              <p className="text-blue-600 mb-4">CEO & Co-Founder</p>
              <p className="text-gray-600">
                AI researcher with 15+ years of experience in machine learning and business strategy.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              {/* Placeholder for team member photo */}
              <p className="text-gray-500 text-center p-4">
                [Team member photo]
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Dr. Sarah Kim</h3>
              <p className="text-blue-600 mb-4">CTO & Co-Founder</p>
              <p className="text-gray-600">
                Former lead AI researcher at Tech University with expertise in deep learning and neural networks.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-200 h-64 flex items-center justify-center">
              {/* Placeholder for team member photo */}
              <p className="text-gray-500 text-center p-4">
                [Team member photo]
              </p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">Michael Johnson</h3>
              <p className="text-blue-600 mb-4">Head of Business Development</p>
              <p className="text-gray-600">
                20+ years of experience in technology consulting and enterprise solutions.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="light">
        <SectionHeading
          title="Our Values"
          subtitle="The principles that guide everything we do"
          centered
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Integrity</h3>
            <p className="text-gray-600">
              We uphold the highest ethical standards in all our interactions and decisions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-gray-600">
              We continuously explore new ideas and technologies to deliver cutting-edge solutions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-gray-600">
              We work closely with our clients and partners to achieve shared success.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Excellence</h3>
            <p className="text-gray-600">
              We strive for the highest quality in everything we do, from code to customer service.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default AboutPage;
